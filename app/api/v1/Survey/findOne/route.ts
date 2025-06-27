import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/v1/survey";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { pID, group } = await req.json();
    const survey = await Survey.findOne({ pID, group });
    return NextResponse.json({ result: "success", survey });
  } catch (error) {
    console.error("Error finding survey data by pID:", error);
    return NextResponse.json({ result: "failed", error });
  }
}
