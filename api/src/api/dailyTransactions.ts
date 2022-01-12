import { FastifyReply } from "fastify";
import { prisma } from "../prisma";
import { Result } from "../types/FileData";

/**
 * TODO - start date as an option
 * TODO - end date as an option
 */
export async function dailyTransactions(_: unknown, reply: FastifyReply) {
  const result = await prisma.$queryRaw<Result[]>`
  select to_timestamp(burn_block_time)::date as "date", count(*) as "value" from txs 
    where to_timestamp(burn_block_time)::date between '2021-01-01' and current_date
      group by 1`;

  reply.send(result);
}
