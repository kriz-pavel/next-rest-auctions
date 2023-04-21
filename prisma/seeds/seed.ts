import { PrismaClient } from '@prisma/client';
import { seedAuctions } from './seed_auctions';
import { seedUsers } from './seed_users';

const prisma = new PrismaClient();

async function main() {
  await seedUsers(prisma);
  await seedAuctions(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
