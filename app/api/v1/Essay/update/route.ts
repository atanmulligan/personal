import connectMongoDB from '@/lib/mongodb';
import Essay from '@/models/v1/essay';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectMongoDB();
    try {
        const { pID, essayNumber, condition, data } = await req.json();
        const essay = await Essay.updateOne(
            { pID, essayNumber, condition },
            { $set: data },
            { upsert: true }
        );
        return NextResponse.json({ result: 'success', essay });
    } catch (error) {
        return NextResponse.json({ result: 'failed', error });
    }
}