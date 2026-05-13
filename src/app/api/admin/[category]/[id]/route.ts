import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request, { params }: { params: { category: string, id: string } }) {
  const { category, id } = params;

  try {
    switch (category) {
      case 'projects': await prisma.project.delete({ where: { id } }); break;
      case 'achievements': await prisma.achievement.delete({ where: { id } }); break;
      case 'experience': await prisma.experience.delete({ where: { id } }); break;
      case 'stats': await prisma.stat.delete({ where: { id } }); break;
      default: return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
