const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function main() {
  try {
    console.log('Attempting to connect to database...');
    await prisma.$connect();
    console.log('Successfully connected to database');

    const userCount = await prisma.user.count();
    console.log('User count:', userCount);

    const supportGroupCount = await prisma.supportGroup.count();
    console.log('Support group count:', supportGroupCount);

    const sessionCount = await prisma.session.count();
    console.log('Session count:', sessionCount);

    const activityCount = await prisma.activity.count();
    console.log('Activity count:', activityCount);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 