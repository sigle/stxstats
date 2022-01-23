import { prisma } from '../prisma';
import { Result } from '../types/FileData';

export async function generateTxsFeePerDay() {
  const result = await prisma.$queryRaw<Result[]>`
  select to_timestamp(burn_block_time)::date as "date", sum(fee_rate) as "value" from txs 
    where to_timestamp(burn_block_time)::date between '2021-01-01' and current_date
      group by 1`;
  return result;
}
