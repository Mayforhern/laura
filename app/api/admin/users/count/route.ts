import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Create a new Prisma client instance
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export async function GET() {
  console.log('Starting users count API request...');
  
  try {
    // Test database connection
    await prisma.$connect();
    console.log('Successfully connected to database');

    // Get user count
    const count = await prisma.user.count();
    console.log('Successfully fetched user count:', count);
    
    return NextResponse.json({ count });
  } catch (error) {
    // Log the full error
    console.error('Detailed error in users count API:', error);
    
    // Return a more detailed error response
    return NextResponse.json(
      { 
        error: 'Database operation failed',
        details: error instanceof Error ? error.message : 'Unknown error',
        count: 0 
      },
      { status: 500 }
    );
  } finally {
    // Always disconnect
    await prisma.$disconnect();
    console.log('Disconnected from database');
  }
} 