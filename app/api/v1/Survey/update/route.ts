import connectMongoDB from "@/lib/mongodb";
import Survey from "@/models/v1/survey";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectMongoDB();
  try {
    const { pID, group, formData } = await req.json();
    const survey = await Survey.updateOne(
      { pID, group },
      { $set: { formData } },
      { upsert: true },
    );
    return NextResponse.json({ result: "success", survey });
  } catch (error) {
    return NextResponse.json({ result: "failed", error });
  }
}
