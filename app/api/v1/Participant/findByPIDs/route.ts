import connectMongoDB from "@/lib/mongodb";
import Participant from "@/models/v1/participant";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

interface RequestData {
  pIDs: string[];
}

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { pIDs }: RequestData = await req.json();
    const query = { pID: { $in: pIDs } };
    const participants = await Participant.find(query).sort({
      createdAt: -1,
    });

    return NextResponse.json({ result: "success", participants });
  } catch (error) {
    return NextResponse.json({ result: "failed", error });
  }
}
