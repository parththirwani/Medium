import { prisma } from "@/app/lib/prisma";
import { authSchema } from "@/app/schema/authSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextRequest, NextResponse } from "next/server";
import "dotenv/config";

const JWT_SECRET = process.env.JWT_SECRET

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const parsedData = authSchema.safeParse(data)

        if (!parsedData.success) {
            return NextResponse.json(
                { message: "Invalid input" },
                { status: 400 }
            )
        }

        const { username, password } = parsedData.data

        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            )
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 403 }
            )
        }
        const token = jwt.sign({
            username: username,
            userId: user.id
        }, JWT_SECRET!)

        return NextResponse.json(
            { message: "User successfully logged in" , token: token},
            { status: 200 }
        )
    } catch (err) {
        return Response.json(
            { message: "Internal Server Error " + console.error(err) },
            { status: 500 },
        )
    }

}