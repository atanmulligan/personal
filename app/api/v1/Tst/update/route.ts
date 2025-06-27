import connectMongoDB from "@/lib/mongodb";
import Tst from "@/models/v1/tst";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectMongoDB();
  try {
    const { pID, data } = await req.json();
    console.log(data)
    const tst = await Tst.updateOne(
      { pID },
      { $set: data },
      { upsert: true },
    );
    return NextResponse.json({ result: "success", tst });
  } catch (error) {
    return NextResponse.json({ result: "failed", error });
  }
}
