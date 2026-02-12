import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = "edge";

const google = createGoogleGenerativeAI({
  apiKey : process.env.GOOGLE_GENERATIVE_AI_API_KEY
});

export const POST = async (request: Request) => {
  try {
    const prompt: string = "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await streamText({
      model: google("gemini-2.0-flash"),
      system: "You are a specialized question generator. Output ONLY the raw string of questions separated by '||'. Do not include any introductory text, explanations, or quotes.",

      prompt: prompt,
      maxOutputTokens: 300,
      temperature: 0.8
    });

    return response.toTextStreamResponse();
  }
  catch (error: any) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { message: error.message || "An unexpected error occurred" },
      { status: 500 }
    );
  };
};

// OPENAI version (too costly)
/* import OpenAI from "openai";
import { StreamingTextResponse, OpenAIStream } from 'ai';
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const prompt =  "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      max_output_tokens: 400,
      stream: true,
      input:prompt,
    });

    const steam = OpenAIStream(response);

    return new StreamingTextResponse(steam);
  }
  catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;
      return NextResponse.json({
        name, status, headers, message
      }, { status: status });
    }
    else {
      console.error("An unexpected error occurred ", error);
      throw error;
    };
  };
};
*/