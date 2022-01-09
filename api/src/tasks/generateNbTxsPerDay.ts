import { prisma } from "../prisma";
import { Result } from "../types/FileData";

/**
 * Generate the number of transactions per day.
 * "burn_block_time" is stored as an integer, so we have to convert it to timestamp
 * then to date.
 */
export async function generateNbTxsPerDay() {
  const result = await prisma.$queryRaw<Result[]>`
  select to_timestamp(burn_block_time)::date as "date", count(*) as "value" from txs 
    where to_timestamp(burn_block_time)::date between '2021-01-01' and current_date
      group by 1`;
  return result;
}
