import connectMongoDB from '@/lib/mongodb';
import Demographic from '@/models/v1/demographic';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    await connectMongoDB();
    const demographics = await Demographic.find({ version: 1 }).sort({
        createdAt: -1,
    });

    return NextResponse.json({ demographics });
}
