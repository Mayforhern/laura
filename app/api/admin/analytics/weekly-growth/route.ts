import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Get current timestamp
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Get users created in the last week
    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: weekAgo
        }
      }
    });

    // Get total users before last week
    const oldUsers = await prisma.user.count({
      where: {
        createdAt: {
          lt: weekAgo
        }
      }
    });

    // Calculate growth percentage
    const growthPercentage = oldUsers === 0 
      ? newUsers * 100  // If no old users, each new user represents 100% growth
      : Math.round((newUsers / oldUsers) * 100);

    return NextResponse.json({ 
      percentage: growthPercentage,
      newUsers,
      oldUsers,
      total: newUsers + oldUsers
    });
  } catch (error) {
    console.error('Error calculating weekly growth:', error);
    return NextResponse.json({ 
      percentage: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 