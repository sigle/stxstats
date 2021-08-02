import { addDays, isBefore, format } from "date-fns";
import { prisma } from "../prisma";
import { startDate, Result } from "../utils";

export async function generateNbTxsPerDay(currentData: Result[]) {
  const endDate = new Date();
  let iteratorDate = startDate;
  const result: Result[] | undefined = [];

  const sortedData = currentData.sort((a, b) => {
    //@ts-ignore
    return new Date(b.date) - new Date(a.date);
  });
  // We take latest date of from dates already recorder and make
  // it iterator date
  iteratorDate = new Date(sortedData[0].date);

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
