import connectMongoDB from "@/lib/mongodb";
import EssayOrder from "@/models/v1/essayOrder";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { pID } = await req.json();
        const essayOrders = await EssayOrder.find({ pID });
        return NextResponse.json({ result: "success", essayOrders });
    } catch (error) {
        console.error("Error finding essayOrder data by pID:", error);
        return NextResponse.json({ result: "failed", error });
    }
}
