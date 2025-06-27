import connectMongoDB from "@/lib/mongodb";
import UserProfile from "@/models/v1/userProfile";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
    await connectMongoDB();
    try {
        const { pID, code, userProfile } = await req.json();
        const up = await UserProfile.updateOne(
            { pID, code },
            { $set: { userProfile } },
            { upsert: true },
        );
        return NextResponse.json({ result: "success", up });
    } catch (error) {
        return NextResponse.json({ result: "failed", error });
    }
}
