import { writeFileSync } from "fs";
import { PrismaClient } from "@prisma/client";
import { addDays, isBefore, format } from "date-fns";

const prisma = new PrismaClient();

// First day of stacks 2.0
const startDate = new Date(2021, 0, 14);

async function generateNbTxsPerDay() {
  const endDate = new Date();
  let iteratorDate = startDate;
  const result = [];

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
    result.push({ date: dateFormatted, value: transactionsCount });

    iteratorDate = addDays(iteratorDate, 1);
  }

  return result;
}

async function generateUniqueAddressGrowingPerDay() {
  const endDate = new Date();
  let iteratorDate = startDate;
  const result = [];
  // Using an object is better for performance here
  const uniqueAddresses: { [key: string]: true } = {};

  // Loop day by day between both dates
  while (isBefore(iteratorDate, endDate)) {
    const dayAfter = addDays(iteratorDate, 1);
    // Find all the blocks mined on that day
    const blocks = await prisma.blocks.findMany({
      where: {
        burn_block_time: {
          gte: iteratorDate.getTime() / 1000,
          lt: dayAfter.getTime() / 1000,
        },
      },
      select: {
        block_height: true,
      },
    });

    const dateFormatted = format(iteratorDate, "yyyy-MM-dd");

    if (blocks.length > 0) {
      const startBlock = blocks[0].block_height;
      const endBlock = blocks[blocks.length - 1].block_height;

      // Find all the events happening on that day by blocks height
      const events = await prisma.stx_events.findMany({
        where: {
          block_height: {
            gte: startBlock,
            lte: endBlock,
          },
        },
      });

      // Add new entries for uniqueness
      events.forEach((event) => {
        if (event.sender && !uniqueAddresses[event.sender]) {
          uniqueAddresses[event.sender] = true;
        }
        if (event.recipient && !uniqueAddresses[event.recipient]) {
          uniqueAddresses[event.recipient] = true;
        }
      });

      const numberOfUniqueAddresses = Object.keys(uniqueAddresses).length;

      result.push({ date: dateFormatted, value: numberOfUniqueAddresses });
    } else {
      result.push({ date: dateFormatted, value: 0 });
    }

    iteratorDate = addDays(iteratorDate, 1);
  }

  return result;
}

async function main() {
  const nbTxsPerDay = await generateNbTxsPerDay();

  const uniqueAddressGrowingPerDay = await generateUniqueAddressGrowingPerDay();

  const fileData = { nbTxsPerDay, uniqueAddressGrowingPerDay };

  writeFileSync("./data.json", JSON.stringify(fileData), { encoding: "utf-8" });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
