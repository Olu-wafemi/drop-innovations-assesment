import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "User", "Ride" RESTART IDENTITY CASCADE;`;
  });
  
  afterAll(async () => {
    await prisma.$disconnect();
  });