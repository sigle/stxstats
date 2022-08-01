import { ApiProperty } from '@nestjs/swagger';

export class DailyTransactions {
  @ApiProperty({ example: '2021-01-15' })
  date: string;

  @ApiProperty({ example: 1537 })
  txCount: number;
}

export class DailyTransactionsNetworkFees {
  @ApiProperty({ example: '2021-01-15' })
  date: string;

  @ApiProperty({ example: 344805 })
  txFee: number;
}
