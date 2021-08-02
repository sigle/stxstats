import { addDays, isBefore, format } from "date-fns";
import { prisma } from "../prisma";
import { startDate, Result } from "../utils";

export async function generateUniqueAddressGrowingPerDay(
  currentData: Result[] | undefined
) {
  const endDate = new Date();
  // We take latest date of from dates already recorded and make
  // it the iterator date
  let iteratorDate = currentData
    ? new Date(currentData[currentData.length - 1].date)
    : startDate;
  const result: Result[] | undefined = [];
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
        select: {
          sender: true,
          recipient: true,
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
