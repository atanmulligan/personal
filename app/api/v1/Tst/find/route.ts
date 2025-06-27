import connectMongoDB from "@/lib/mongodb";
import Tst from "@/models/v1/tst";
import { connect } from "http2";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { pID } = await req.json();
    const tsts = await Tst.find({ pID });
    return NextResponse.json({ tsts });
  } catch (error) {
    console.error("Error finding tst data by pID:", error);
    return NextResponse.error();
  }
}
