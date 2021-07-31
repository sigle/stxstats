import { addDays, isBefore, format } from "date-fns";
import { prisma } from "../prisma";
import { startDate, Result } from "../utils";

export async function generateNbTxsPerDay(currentData: Result[]) {
  const endDate = new Date();
  let iteratorDate = startDate;
  const result: Result[] | undefined = [];

  // Loop day by day between both dates
  while (isBefore(iteratorDate, endDate)) {
    // We check whether iterator date has values in current data.json
    currentData.map(async (currentData) => {
      if (
        format(new Date(currentData.date), "yyyy-MM-dd") ===
        format(iteratorDate, "yyyy-MM-dd")
      ) {
        iteratorDate = addDays(iteratorDate, 1);
      } else {
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
    });
  }

  return result;
}
