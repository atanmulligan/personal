import connectMongoDB from '@/lib/mongodb';
import Demographic from '@/models/v1/demographic';
import { NextRequest, NextResponse } from 'next/server';

interface RequestData {
    pIDs: string[];
}

export async function POST(req: NextRequest) {
    try {
        await connectMongoDB();
        const { pIDs }: RequestData = await req.json();
        const query = { pID: { $in: pIDs } };
        const demographics = await Demographic.find(query).sort({
            createdAt: -1,
        });

        return NextResponse.json({ result: 'success', demographics });
    } catch (error) {
        return NextResponse.json({ result: 'failed', error });
    }
}