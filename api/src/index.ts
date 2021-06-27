import { PrismaClient } from "@prisma/client";
import { addDays, isBefore, format } from "date-fns";

const prisma = new PrismaClient();

async function main() {
  // TODO start first day of stacks 2.0
  const startDate = new Date(2021, 0, 1);
  const endDate = new Date();
  let iteratorDate = startDate;

  // Loop day by day between both dates
  while (isBefore(iteratorDate, endDate)) {
    const dayAfter = addDays(iteratorDate, 1);

    const transactionsCount = await prisma.txs.count({
      where: {
        burn_block_time: {
          gte: iteratorDate.getTime() / 1000,
          lt: dayAfter.getTime() / 1000,
        },
      },
    });

    const dateFormatted = format(iteratorDate, "yyyy-MM-dd");
    console.log(`Loop at ${dateFormatted} - ${transactionsCount} txs`);
    iteratorDate = addDays(iteratorDate, 1);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
