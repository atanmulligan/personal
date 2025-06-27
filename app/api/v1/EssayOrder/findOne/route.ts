import connectMongoDB from "@/lib/mongodb";
import EssayOrder from "@/models/v1/essayOrder";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { pID, essayNumber } = await req.json();
        const essayOrder = await EssayOrder.findOne({ pID, essayNumber });
        return NextResponse.json({ result: "success", essayOrder });
    } catch (error) {
        console.error("Error finding survey data by pID:", error);
        return NextResponse.json({ result: "failed", error });
    }
}
