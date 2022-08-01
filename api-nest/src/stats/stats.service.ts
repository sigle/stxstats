import { Injectable } from '@nestjs/common';
import { subDays } from 'date-fns';
import { fetch } from 'undici';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const [blockHeight, totalTransactions, transactionsLast24h, poxInfos] =
      await Promise.all([
        // Get the latest block infos
        (async () => {
          const lastBlock = await this.prisma.blocks.findFirst({
            select: { block_height: true, burn_block_time: true },
            orderBy: { block_height: 'desc' },
          });
          return lastBlock;
        })(),
        // Get the total number of transactions
        (async () => {
          const totalTransactions = await this.prisma.txs.count();
          return totalTransactions;
        })(),
        // Get the last 24h transactions
        (async () => {
          const now = new Date();
          const yesterday = subDays(now, 1);
          const transactionsLast24h = await this.prisma.txs.count({
            where: {
              burn_block_time: {
                gte: Math.floor(yesterday.getTime() / 1000),
                lt: Math.floor(now.getTime() / 1000),
              },
            },
          });
          return transactionsLast24h;
        })(),
        // Get the POX infos
        (async () => {
          const response = await fetch(
            'https://stacks-node-api.mainnet.stacks.co/v2/pox',
            {
              method: 'GET',
            }
          );
          const data = (await response.json()) as any;
          return {
            totalStacked: data.current_cycle.stacked_ustx,
            nextCycleIn: data.next_reward_cycle_in,
          };
        })(),
      ]);

    const response = {
      blockHeight: blockHeight?.block_height || 0,
      lastBlockTime: blockHeight?.burn_block_time || 0,
      totalTransactions,
      transactionsLast24h,
      totalStacked: poxInfos.totalStacked,
      nextCycleIn: poxInfos.nextCycleIn,
    };

    return response;
  }

  async dailyTransactions(): Promise<{ date: string; txCount: number }[]> {
    const response = await this.prisma.$queryRaw<
      { date: string; txCount: number }[]
    >`
    select to_timestamp(burn_block_time)::date as "date", count(*) as "txCount" from txs 
      where to_timestamp(burn_block_time)::date between '2021-01-01' and current_date
        group by 1`;
    return response;
  }

  async dailyTransactionsNetworkFees(): Promise<
    { date: string; txCount: number }[]
  > {
    const response = await this.prisma.$queryRaw<
      { date: string; txCount: number }[]
    >`
    select to_timestamp(burn_block_time)::date as "date", sum(fee_rate) as "txFee" from txs 
      where to_timestamp(burn_block_time)::date between '2021-01-01' and current_date
        group by 1`;
    return response;
  }
}
