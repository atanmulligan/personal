import connectMongoDB from "@/lib/mongodb";
import Participant from "@/models/v1/participant";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectMongoDB();
  try {
    const { pID, data } = await req.json();
    data.version = 1;
    const participant = await Participant.updateOne(
      { pID },
      { $set: data },
      { upsert: true },
    );
    return NextResponse.json({ result: "success", participant });
  } catch (error) {
    return NextResponse.json({ result: "failed", error });
  }
}
