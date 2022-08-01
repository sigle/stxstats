import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StatsService {
  constructor(private prisma: PrismaService) {}

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
