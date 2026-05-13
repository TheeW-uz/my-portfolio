import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const scores = await prisma.highScore.findMany({
      orderBy: { score: 'desc' },
      take: 10,
    });
    return NextResponse.json(scores);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { nickname, score } = await req.json();

    if (!nickname || score === undefined) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const highScore = await prisma.highScore.create({
      data: { nickname, score },
    });

    return NextResponse.json({ success: true, data: highScore });
  } catch (error) {
    console.error('Score API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
