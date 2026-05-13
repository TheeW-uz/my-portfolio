import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { category: string } }) {
  const { category } = params;
  
  try {
    let data;
    switch (category) {
      case 'projects': data = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } }); break;
      case 'achievements': data = await prisma.achievement.findMany({ orderBy: { createdAt: 'desc' } }); break;
      case 'experience': data = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } }); break;
      case 'stats': data = await prisma.stat.findMany({ orderBy: { createdAt: 'desc' } }); break;
      default: return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { category: string } }) {
  const { category } = params;
  const body = await req.json();

  try {
    let data;
    switch (category) {
      case 'projects': data = await prisma.project.create({ data: body }); break;
      case 'achievements': data = await prisma.achievement.create({ data: body }); break;
      case 'experience': data = await prisma.experience.create({ data: body }); break;
      case 'stats': data = await prisma.stat.create({ data: body }); break;
      default: return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (error) {
    console.error('Admin POST Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
