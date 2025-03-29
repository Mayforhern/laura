import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Try to get real data from database
    const count = await prisma.supportGroup.count();
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching support groups count:', error);
    // Return 0 instead of error status
    return NextResponse.json({ count: 0 });
  }
} 