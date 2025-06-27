import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const maxDuration = process.env.MAX_DURATION || 60;
const clientOption = {
    apiKey: process.env.OPENAI_API_KEY
}
const openai = new OpenAI(clientOption);

export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        const { systemMessage } = await req.json();

        // console.log(systemMessage)
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemMessage }],
            // response_format: { type: 'json_object' },
            model: "gpt-4o",
        });

        return NextResponse.json({ result: "success", essay: completion.choices[0].message.content });
    } catch (error) {
        console.error("Error generating userProfile data by pID:", error);
        return NextResponse.json({ result: "failed", error });
    }
}
