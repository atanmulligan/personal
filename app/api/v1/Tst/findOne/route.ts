import connectMongoDB from "@/lib/mongodb";
import Tst from "@/models/v1/tst";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;


export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { pID } = await req.json();
        const tst = await Tst.findOne({ pID });
        return NextResponse.json({ result: "success", tst });
    } catch (error) {
        return NextResponse.json({ result: "failed", error });
    }
}
