import connectMongoDB from "@/lib/mongodb";
import Essay from "@/models/v1/essay";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { pID, essayNumber } = await req.json();
        const essays = await Essay.find({ pID, essayNumber });
        return NextResponse.json({ result: "success", essays });
    } catch (error) {
        console.error("Error finding survey data by pID:", error);
        return NextResponse.json({ result: "failed", error });
    }
}
