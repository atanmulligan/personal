import connectMongoDB from "@/lib/mongodb";
import EssayOrder from "@/models/v1/essayOrder";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectMongoDB();
  try {
    const { orders } = await req.json();
    const essayOrders = await EssayOrder.insertMany(orders);
    return NextResponse.json({ result: "success", essayOrders });
  } catch (error) {
    return NextResponse.json({ result: "failed", error });
  }
}
