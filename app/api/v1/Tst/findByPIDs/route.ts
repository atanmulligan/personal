import connectMongoDB from "@/lib/mongodb";
import Tst from "@/models/v1/tst";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;


export async function POST(req: NextRequest) {
  try {
    await connectMongoDB();
    const { pIDs } = await req.json();
    const tsts = await Tst.find({ pID: { $in: pIDs } });
    console.log(tsts)
    return NextResponse.json({ result: "success", tsts });
  } catch (error) {
    return NextResponse.json({ result: "failed", error });
  }
}
