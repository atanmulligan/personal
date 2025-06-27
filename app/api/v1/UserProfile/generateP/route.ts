import { generatePJSONFormat, generatePTemplate } from "@/lib/v1/userProfile/userProfileP";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
const maxDuration = process.env.MAX_DURATION || 60;

export const revalidate = 0;

export async function POST(req: NextRequest) {
    try {
        const startTime = new Date().getTime();
        console.log(maxDuration)
        const { p1 } = await req.json();
        const systemMessage = `${generatePTemplate}
        ${p1}

${generatePJSONFormat}`

        // Initialize OpenAI client only when the route is called
        const clientOption = {
            apiKey: process.env.OPENAI_API_KEY
        }
        const openai = new OpenAI(clientOption);

        // console.log(systemMessage)
        const completion = await openai.chat.completions.create({
            messages: [{ role: "system", content: systemMessage }],
            response_format: { type: 'json_object' },
            model: "gpt-4o",
        });
        // await connectMongoDB();
        const endTime = new Date().getTime();
        // time taken in seconds
        const timeTaken = (endTime - startTime) / 1000;
        console.log("Time taken to generate userProfile data by pID:", timeTaken);
        // const userProfile = await UserProfile.findOne({ pID, code });
        return NextResponse.json({ result: "success", completion });
    } catch (error) {
        console.error("Error generating userProfile data by pID:", error);
        return NextResponse.json({ result: "failed", error });
    }
}
