import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/v1/survey";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { pID } = await req.json();
    const surveys = await Survey.find({ pID });
    return NextResponse.json({ surveys });
  } catch (error) {
    console.error("Error finding survey data by pID:", error);
    return NextResponse.error();
  }
}
