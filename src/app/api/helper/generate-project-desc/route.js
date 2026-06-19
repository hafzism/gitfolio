import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request) {
  try {
    const { projectName, language, originalDescription } = await request.json();

    if (!projectName) {
      return NextResponse.json(
        { error: 'Project name is required' },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.includes('your_groq_api_key_here')) {
      return NextResponse.json(
        { error: 'Groq API Key is not configured' },
        { status: 400 }
      );
    }

    const prompt = `You are a professional portfolio writer. Write a polished, compelling 1-2 sentence description for a developer's project card.

Project Details:
- Name: ${projectName}
- Principal Language/Technology: ${language || 'General/Various'}
- Current Description: ${originalDescription || 'No description provided'}

Rules:
- Be concise (maximum 150 characters).
- Make it sound professional, focusing on the utility and tech stack.
- Write in active voice.
- Do not use quotes around the output.
- Output ONLY the description text, nothing else.`;

    const completion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: prompt }],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.7,
      max_tokens: 150,
    });

    const description = completion.choices[0]?.message?.content?.trim();

    if (!description) {
      return NextResponse.json(
        { error: 'Failed to generate description' },
        { status: 500 }
      );
    }

    return NextResponse.json({ description });
  } catch (err) {
    console.error('Project description generation error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
