import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Define types for request and response for better clarity
interface RequestBody {
    dreamText: string;
    location?: string;
}

interface SuccessResponse {
    visualizationText: string;
}

interface ErrorResponse {
    error: string;
}

export async function POST(request: Request): Promise<NextResponse<SuccessResponse | ErrorResponse>> {
    if (!process.env.OPENAI_API_KEY) {
        console.error('OPENAI_API_KEY is not set in environment variables.');
        return NextResponse.json(
            { error: 'Server configuration error. Unable to connect to visualization service.' },
            { status: 500 }
        );
    }

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    try {
        const { dreamText, location }: RequestBody = await request.json();

        if (!dreamText || typeof dreamText !== 'string' || dreamText.trim() === '') {
            return NextResponse.json(
                { error: 'Dream text is required and must be a non-empty string.' },
                { status: 400 }
            );
        }

        const userLocation = (location && typeof location === 'string' && location.trim() !== '') ? location.trim() : 'in a faraway land';

        // KIP-inspired prompt (as per task details, assuming PRD alignment)
        const prompt = `Provide me with a visualization exercise, drawing inspiration from Katathym Imaginative Psychotherapy (KIP), designed to help a client visualize their desired goal, particularly one they currently perceive as unattainable. Your output is the instruction to the user that he will read and imagine with it. Begin the visualization by incorporating the client\'s current place of residence or physical location ${userLocation}. The desired goal is described below: \n${dreamText}`;

        const response = await openai.chat.completions.create({
            model: 'gpt-4.1-mini', // As specified in task 3 details
            messages: [
                { role: 'system', content: 'You are a helpful assistant specializing in guided visualization exercises.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const visualizationText = response.choices[0]?.message?.content?.trim() || '';

        if (!visualizationText) {
            console.warn('OpenAI response did not contain visualization text.', response);
            return NextResponse.json(
                { error: 'Failed to generate visualization content from AI service.' },
                { status: 500 }
            );
        }

        return NextResponse.json({ visualizationText });

    } catch (error: unknown) {
        let errorMessage = 'Failed to generate visualization. Please try again.';
        let statusCode = 500;

        if (error instanceof SyntaxError) {
            errorMessage = 'Invalid request format. Please check your input.';
            statusCode = 400;
        } else if (error && typeof error === 'object' && 'response' in error) {
            const openAIError = error as { response?: { status?: unknown, data?: unknown } };
            console.error('OpenAI API Error:', JSON.stringify({ status: openAIError.response?.status, data: openAIError.response?.data }, null, 2));
        } else if (error instanceof Error) {
            console.error('Error generating visualization:', JSON.stringify({ message: error.message, stack: error.stack }, null, 2));
        } else {
            console.error('Unknown error generating visualization:', JSON.stringify(error, null, 2));
        }

        return NextResponse.json(
            { error: errorMessage },
            { status: statusCode }
        );
    }
} 