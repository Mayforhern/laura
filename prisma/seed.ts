const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('Clearing existing data...')
  // Clear ALL existing data
  await prisma.activity.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.supportGroup.deleteMany({});
  await prisma.user.deleteMany({});
  
  console.log('Creating test users...')
  // Create test users
  const admin = await prisma.user.create({
    data: {
      email: 'mayankdindoire@gmail.com',
      name: 'Mayank',
      walletAddress: '0x98EE7891eC3fe81453d78F37457d81D91A0248bD',
    },
  })

  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'user1@example.com',
        name: 'Test User 1',
        walletAddress: '0x1234567890123456789012345678901234567890',
      },
    }),
    prisma.user.create({
      data: {
        email: 'user2@example.com',
        name: 'Test User 2',
        walletAddress: '0x0987654321098765432109876543210987654321',
      },
    }),
  ])

  console.log('Creating support groups...')
  // Create support groups
  const groups = await Promise.all([
    prisma.supportGroup.create({
      data: {
        name: 'Anxiety Support',
        description: 'A safe space to discuss anxiety and coping mechanisms',
      },
    }),
    prisma.supportGroup.create({
      data: {
        name: 'Depression Support',
        description: 'Support group for managing depression',
      },
    }),
    prisma.supportGroup.create({
      data: {
        name: 'General Mental Health',
        description: 'Open discussion about mental health and wellness',
      },
    }),
  ])

  console.log('Creating sessions and activities...')
  // Create sessions and activities for each user
  const now = new Date();
  
  for (const user of [admin, ...users]) {
    // Create sessions
    await Promise.all([
      // Therapy session
      prisma.session.create({
        data: {
          userId: user.id,
          type: 'therapy',
          metadata: {
            topic: 'Initial consultation',
            duration: 30,
          },
          startTime: new Date(now.getTime() - 15 * 60000), // 15 minutes ago
          endTime: null, // Still active
        },
      }),
      // Support group session
      prisma.session.create({
        data: {
          userId: user.id,
          type: 'support_group',
          groupId: groups[0].id, // Anxiety Support
          metadata: {
            topic: 'Weekly check-in',
            duration: 60,
          },
          startTime: new Date(now.getTime() - 30 * 60000), // 30 minutes ago
          endTime: new Date(now.getTime() - 15 * 60000), // Ended 15 minutes ago
        },
      }),
      // Another support group session
      prisma.session.create({
        data: {
          userId: user.id,
          type: 'support_group',
          groupId: groups[1].id, // Depression Support
          metadata: {
            topic: 'Coping strategies',
            duration: 45,
          },
          startTime: new Date(now.getTime() - 60 * 60000), // 1 hour ago
          endTime: new Date(now.getTime() - 45 * 60000), // Ended 45 minutes ago
        },
      }),
    ])

    // Create activities
    await Promise.all([
      prisma.activity.create({
        data: {
          userId: user.id,
          type: 'session_started',
          description: 'Started a therapy session',
          createdAt: new Date(now.getTime() - 10 * 60000), // 10 minutes ago
        },
      }),
      prisma.activity.create({
        data: {
          userId: user.id,
          type: 'group_joined',
          description: 'Joined Anxiety Support group',
          createdAt: new Date(now.getTime() - 30 * 60000), // 30 minutes ago
        },
      }),
      prisma.activity.create({
        data: {
          userId: user.id,
          type: 'profile_updated',
          description: 'Updated profile settings',
          createdAt: new Date(now.getTime() - 120 * 60000), // 2 hours ago
        },
      }),
    ])
  }

  console.log('Database has been seeded with clean data. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 