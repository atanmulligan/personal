import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/v1/survey";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

interface RequestData {
  pIDs: string[];
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { pIDs }: RequestData = await req.json();
    const surveys = await Survey.find({ pID: { $in: pIDs } });
    return NextResponse.json({ surveys });
  } catch (error) {
    console.error("Error finding data by pIDs:", error);
    return NextResponse.error();
  }
}
