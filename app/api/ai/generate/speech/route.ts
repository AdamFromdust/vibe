import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { requireAuthMiddleware } from '../../_auth'; // Assuming auth middleware is in this path

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Allow streaming responses up to 30 seconds, though TTS might be faster
export const maxDuration = 30;

export async function POST(request: NextRequest) {
  // Check authentication
  const authError = await requireAuthMiddleware();
  if (authError) return authError;

  try {
    const { text, voice } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const selectedVoice = voice || 'nova'; // Default to 'nova' if no voice is provided
    // Valid voices: alloy, echo, fable, onyx, nova, shimmer
    const validVoices = ['alloy', 'echo', 'fable', 'onyx', 'nova', 'shimmer'];
    if (!validVoices.includes(selectedVoice)) {
      return NextResponse.json({ error: 'Invalid voice selected' }, { status: 400 });
    }

    const mp3 = await openai.audio.speech.create({
      model: 'tts-1', // or 'tts-1-hd'
      voice: selectedVoice,
      input: text,
      response_format: 'mp3',
    });

    const buffer = Buffer.from(await mp3.arrayBuffer());

    // Return the audio as a blob
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });

  } catch (error) {
    console.error('Error generating speech:', error);
    let errorMessage = 'Failed to generate speech';
    if (error instanceof OpenAI.APIError) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
} 