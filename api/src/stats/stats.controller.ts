import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import {
  ActiveAddressesPerDay,
  DailyTransactions,
  DailyTransactionsNetworkFees,
  UniqueAddressGrowingPerDay,
} from './stats.entity';
import { StatsService } from './stats.service';

@Controller('stats')
@UseInterceptors(CacheInterceptor)
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @CacheTTL(120)
  @Get('dashboard')
  dashboard() {
    return this.statsService.dashboard();
  }

  @CacheTTL(120)
  @Get('dailyTransactions')
  @ApiResponse({
    status: 200,
    description: 'Get the daily transactions count of the Stacks Blockchain.',
    type: DailyTransactions,
    isArray: true,
  })
  dailyTransactions() {
    return this.statsService.dailyTransactions();
  }

  @CacheTTL(120)
  @Get('dailyTransactionsNetworkFees')
  @ApiResponse({
    status: 200,
    description:
      'Get the daily amount of transactions fees paid to miners of the Stacks Blockchain.',
    type: DailyTransactionsNetworkFees,
    isArray: true,
  })
  dailyTransactionsNetworkFees() {
    return this.statsService.dailyTransactionsNetworkFees();
  }

  // Cache for 1 hours
  @CacheTTL(21600)
  @Get('activeAddressesPerDay')
  @ApiResponse({
    status: 200,
    description: 'Get the daily active addresses of the Stacks Blockchain.',
    type: ActiveAddressesPerDay,
    isArray: true,
  })
  activeAddressesPerDay() {
    return this.statsService.activeAddressesPerDay();
  }

  // Cache for 6 hours
  @CacheTTL(21600)
  @Get('uniqueAddressGrowingPerDay')
  @ApiResponse({
    status: 200,
    description:
      'Get the daily growing unique active addresses of the Stacks Blockchain.',
    type: UniqueAddressGrowingPerDay,
    isArray: true,
  })
  uniqueAddressGrowingPerDay() {
    return this.statsService.uniqueAddressGrowingPerDay();
  }
}
