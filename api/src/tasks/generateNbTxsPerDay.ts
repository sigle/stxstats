import { addDays, isBefore, format } from "date-fns";
import { prisma } from "../prisma";
import { startDate, Result } from "../utils";

export async function generateNbTxsPerDay(currentData: Result[] | undefined) {
  const endDate = new Date();
  // We take latest date of from dates already recorded and make
  // it the iterator date
  let iteratorDate = currentData
    ? new Date(currentData[currentData.length - 1].date)
    : startDate;
  const result: Result[] = currentData ?? [];

  // We remove the last day to make sure that if server restarts on same
  // day the latest data is overwritten
  if (
    currentData &&
    new Date(currentData[currentData.length - 1].date) === endDate
  ) {
    currentData.pop();
  }

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
