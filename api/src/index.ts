import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const block = await prisma.blocks.findFirst({});
  console.log(JSON.stringify(block), 0, 2);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
