import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Try to get real data from database
    const count = await prisma.session.count({
      where: {
        endTime: null, // Sessions that haven't ended
        startTime: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Sessions started in last 24 hours
        }
      }
    });
    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching active sessions:', error);
    // Return 0 instead of error status
    return NextResponse.json({ count: 0 });
  }
} 