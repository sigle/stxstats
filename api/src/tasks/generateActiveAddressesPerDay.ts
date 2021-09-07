import { addDays, isBefore, format, isSameDay } from "date-fns";
import { prisma } from "../prisma";
import { ResultActiveAddresses } from "../types/FileData";
import { startDate } from "../utils";

export async function generateActiveAddressesPerDay(
  currentData: ResultActiveAddresses[] | undefined
) {
  const endDate = new Date();
  // We take latest date of from dates already recorded and make
  // it the iterator date
  let iteratorDate = currentData
    ? new Date(currentData[currentData.length - 1].date)
    : startDate;
  const result: ResultActiveAddresses[] = currentData ?? [];

  // We remove the last day to make sure that if server restarts on same
  // day the latest data is overwritten
  if (
    currentData &&
    isSameDay(new Date(currentData[currentData.length - 1].date), endDate)
  ) {
    currentData.pop();
  }

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

      const totalUniqueAddresses =
        await prisma.$queryRaw<number>`SELECT COUNT(*) FROM (SELECT DISTINCT sender, recipient FROM stx_events WHERE block_height >= ${startBlock} AND block_height <= ${endBlock}) t;`;
      const senderUniqueAddresses =
        await prisma.$queryRaw<number>`SELECT COUNT(*) FROM (SELECT DISTINCT sender FROM stx_events WHERE block_height >= ${startBlock} AND block_height <= ${endBlock}) t;`;
      const recipientUniqueAddresses =
        await prisma.$queryRaw<number>`SELECT COUNT(*) FROM (SELECT DISTINCT recipient FROM stx_events WHERE block_height >= ${startBlock} AND block_height <= ${endBlock}) t;`;

      result.push({
        date: dateFormatted,
        value: totalUniqueAddresses,
        senderUniqueAddresses,
        recipientUniqueAddresses,
      });
    } else {
      result.push({
        date: dateFormatted,
        value: 0,
        senderUniqueAddresses: 0,
        recipientUniqueAddresses: 0,
      });
    }

    iteratorDate = addDays(iteratorDate, 1);
  }

  return result;
}
