import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../prisma';
import { apiCache } from './cache';

interface DataResponse {
  date: string;
  txCount: number;
}

export async function dailyTransactions(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const apiRoute = request.routerPath;
  if (apiCache.has(apiRoute)) {
    return reply.send(apiCache.get(apiRoute));
  }

  const response = await prisma.$queryRaw<DataResponse[]>`
  select to_timestamp(burn_block_time)::date as "date", count(*) as "txCount" from txs 
    where to_timestamp(burn_block_time)::date between '2021-01-01' and current_date
      group by 1`;

  apiCache.set(apiRoute, response);
  reply.send(response);
}
