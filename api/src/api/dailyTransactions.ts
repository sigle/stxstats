import { FastifyReply } from "fastify";
import { prisma } from "../prisma";

interface DataResponse {
  date: string;
  txCount: number;
}

export async function dailyTransactions(_: unknown, reply: FastifyReply) {
  const result = await prisma.$queryRaw<DataResponse[]>`
  select to_timestamp(burn_block_time)::date as "date", count(*) as "txCount" from txs 
    where to_timestamp(burn_block_time)::date between '2021-01-01' and current_date
      group by 1`;

  reply.send(result);
}
