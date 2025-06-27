import connectMongoDB from "@/lib/mongodb";
import Essay from "@/models/v1/essay";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { pID, essayNumber, condition } = await req.json();
        const essay = await Essay.findOne({ pID, essayNumber, condition });
        return NextResponse.json({ result: "success", essay });
    } catch (error) {
        console.error("Error finding survey data by pID:", error);
        return NextResponse.json({ result: "failed", error });
    }
}
