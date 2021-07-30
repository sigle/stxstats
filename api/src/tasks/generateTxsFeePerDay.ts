import { addDays, isBefore, format } from "date-fns";
import { prisma } from "../prisma";
import { startDate } from "../utils";

export async function generateTxsFeePerDay() {
  const endDate = new Date();
  let iteratorDate = startDate;
  const result = [];

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

    // TODO use bigint for addition
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
