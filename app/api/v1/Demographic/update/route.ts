import connectMongoDB from '@/lib/mongodb';
import Demographic from '@/models/v1/demographic';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectMongoDB();
    try {
        const { pID, data } = await req.json();
        data.version = 1;
        const demographic = await Demographic.updateOne(
            { pID },
            { $set: data },
            { upsert: true }
        );
        return NextResponse.json({ result: 'success', demographic });
    } catch (error) {
        return NextResponse.json({ result: 'failed', error });
    }
}