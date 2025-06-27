import connectMongoDB from "@/lib/mongodb";
import Admin from "@/models/v1/admin";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { password } = await req.json();
        // console.log(password)
        const admin = await Admin.findOne();
        // console.log(admin)
        if (admin.password === password) {
            return NextResponse.json({ result: "success" });
        } else {
            return NextResponse.json({ result: "failed" });
        }
    } catch (error) {
        console.error("Error finding survey data by pID:", error);
        return NextResponse.json({ result: "failed", error });
    }
}
