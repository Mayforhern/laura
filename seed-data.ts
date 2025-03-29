import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Starting to seed database...');

    // Create test users
    const users = await Promise.all([
      prisma.user.create({
        data: {
          email: 'mayankdindoire@gmail.com',
          name: 'Mayank',
          walletAddress: '0x98EE7891eC3fe81453d78F37457d81D91A0248bD',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }),
      prisma.user.create({
        data: {
          email: 'test1@example.com',
          name: 'Test User 1',
          walletAddress: '0x1234567890123456789012345678901234567890',
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
          updatedAt: new Date()
        }
      }),
      prisma.user.create({
        data: {
          email: 'test2@example.com',
          name: 'Test User 2',
          walletAddress: '0x0987654321098765432109876543210987654321',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    ]);

    console.log('Created test users:', users);

    // Create support groups
    const groups = await Promise.all([
      prisma.supportGroup.create({
        data: {
          name: 'Anxiety Support',
          description: 'A group for people dealing with anxiety',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }),
      prisma.supportGroup.create({
        data: {
          name: 'Depression Support',
          description: 'Support group for depression',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      }),
      prisma.supportGroup.create({
        data: {
          name: 'Stress Management',
          description: 'Learn to manage daily stress',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
    ]);

    console.log('Created support groups:', groups);

    // Create active sessions
    const sessions = await Promise.all([
      prisma.session.create({
        data: {
          userId: users[0].id,
          type: 'therapy',
          startTime: new Date(),
          metadata: { name: 'Initial Consultation' }
        }
      }),
      prisma.session.create({
        data: {
          userId: users[1].id,
          type: 'support_group',
          startTime: new Date(),
          metadata: { name: 'Group Session' }
        }
      })
    ]);

    console.log('Created active sessions:', sessions);

    // Create activities
    const activities = await Promise.all([
      prisma.activity.create({
        data: {
          userId: users[0].id,
          type: 'session_started',
          description: 'Started a therapy session',
          metadata: { sessionId: sessions[0].id },
          createdAt: new Date()
        }
      }),
      prisma.activity.create({
        data: {
          userId: users[1].id,
          type: 'group_joined',
          description: 'Joined Anxiety Support group',
          metadata: { groupId: groups[0].id },
          createdAt: new Date(Date.now() - 30 * 60 * 1000) // 30 minutes ago
        }
      }),
      prisma.activity.create({
        data: {
          userId: users[2].id,
          type: 'profile_updated',
          description: 'Updated profile settings',
          metadata: {},
          createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
        }
      })
    ]);

    console.log('Created activities:', activities);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main(); 