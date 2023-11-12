import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy articles
  const post1 = await prisma.user.upsert({
    where: { email: 'a@a.com' },
    update: {},
    create: {
      email: 'a@a.com',
      firstName: 'Cristina',
      lastName: 'Man'
    },
  });

  const post2 = await prisma.user.upsert({
    where: { email: 'b@b.com' },
    update: {},
    create: {
      email: 'b@b.com',
      firstName: 'Catalin',
      lastName: 'Man'
    },
  });

  console.log({ post1, post2 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
