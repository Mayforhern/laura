import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Activity {
  id: string;
  type: string;
  description: string;
  createdAt: Date;
}

export async function GET() {
  try {
    // Try to get real data from database
    const activities = await prisma.activity.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      take: 10, // Get last 10 activities
      select: {
        id: true,
        type: true,
        description: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      activities: activities.map((activity: Activity) => ({
        ...activity,
        timestamp: activity.createdAt.toISOString()
      }))
    });
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    // Return empty array instead of error status
    return NextResponse.json({ activities: [] });
  }
} 