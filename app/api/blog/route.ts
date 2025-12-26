import { blogSchema } from "@/app/schema/blogSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const data = await req.json();
    const parsedData = blogSchema.safeParse(data)

    if(!parsedData.success){
        return NextResponse.json(
            {message: "Invalid Input"},
            {status: 400}
        )
    }   
}