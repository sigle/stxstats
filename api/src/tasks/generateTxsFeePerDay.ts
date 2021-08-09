import { addDays, isBefore, format, isSameDay } from "date-fns";
import { prisma } from "../prisma";
import { Result, startDate } from "../utils";

export async function generateTxsFeePerDay(currentData: Result[] | undefined) {
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
    isSameDay(new Date(currentData[currentData.length - 1].date), endDate)
  ) {
    currentData.pop();
  }

  // Loop day by day between both dates
  while (isBefore(iteratorDate, endDate)) {
    const dayAfter = addDays(iteratorDate, 1);

    const transactions = await prisma.txs.findMany({
      where: {
        burn_block_time: {
          gte: iteratorDate.getTime() / 1000,
          lt: dayAfter.getTime() / 1000,
        },
      },
      select: {
        fee_rate: true,
      },
    });

    let totalFee = BigInt(0);
    transactions.forEach((transaction) => {
      totalFee += transaction.fee_rate;
    });

    const dateFormatted = format(iteratorDate, "yyyy-MM-dd");
    result.push({ date: dateFormatted, value: Number(totalFee) });

    iteratorDate = addDays(iteratorDate, 1);
  }

  return result;
}
