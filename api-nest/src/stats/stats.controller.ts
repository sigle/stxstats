import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
@UseInterceptors(CacheInterceptor)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @CacheTTL(120)
  @Get('dailyTransactions')
  dailyTransactions() {
    return this.statsService.dailyTransactions();
  }

  @CacheTTL(120)
  @Get('dailyTransactionsNetworkFees')
  dailyTransactionsNetworkFees() {
    return this.statsService.dailyTransactionsNetworkFees();
  }
}
