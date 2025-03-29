import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface SupportGroup {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

// Get all support groups
export async function GET() {
  try {
    // Get all support groups
    const groups = await prisma.supportGroup.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Get session counts for each group
    const groupsWithCounts = await Promise.all(
      groups.map(async (group: SupportGroup) => {
        const sessionCount = await prisma.session.count({
          where: {
            type: 'support_group',
            groupId: group.id
          }
        });

        return {
          ...group,
          sessionCount
        };
      })
    );

    return NextResponse.json(groupsWithCounts);
  } catch (error) {
    console.error('Error fetching support groups:', error);
    return NextResponse.json({ error: 'Failed to fetch support groups' }, { status: 500 });
  }
}

// Create a new support group
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const group = await prisma.supportGroup.create({
      data: {
        name,
        description
      }
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('Error creating support group:', error);
    return NextResponse.json(
      { error: 'Failed to create support group' },
      { status: 500 }
    );
  }
}

// Update a support group
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description } = body;

    if (!id || !name) {
      return NextResponse.json(
        { error: 'ID and name are required' },
        { status: 400 }
      );
    }

    const group = await prisma.supportGroup.update({
      where: { id },
      data: {
        name,
        description
      }
    });

    return NextResponse.json(group);
  } catch (error) {
    console.error('Error updating support group:', error);
    return NextResponse.json(
      { error: 'Failed to update support group' },
      { status: 500 }
    );
  }
}

// Delete a support group
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'ID is required' },
        { status: 400 }
      );
    }

    await prisma.supportGroup.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting support group:', error);
    return NextResponse.json(
      { error: 'Failed to delete support group' },
      { status: 500 }
    );
  }
} 