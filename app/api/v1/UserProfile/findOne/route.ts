import connectMongoDB from "@/lib/mongodb";
import UserProfile from "@/models/v1/userProfile";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { pID, code } = await req.json();
        const userProfile = await UserProfile.findOne({ pID, code });
        return NextResponse.json({ result: "success", userProfile });
    } catch (error) {
        console.error("Error finding userProfile data by pID:", error);
        return NextResponse.json({ result: "failed", error });
    }
}
