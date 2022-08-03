import { ApiProperty } from '@nestjs/swagger';

export class DailyTransactions {
  @ApiProperty({ example: '2021-01-15' })
  date: string;

  @ApiProperty({ example: 1537 })
  value: number;
}

export class DailyTransactionsNetworkFees {
  @ApiProperty({ example: '2021-01-15' })
  date: string;

  @ApiProperty({ example: 344805 })
  value: number;
}

export class ActiveAddressesPerDay {
  @ApiProperty({ example: '2021-01-15' })
  date: string;

  @ApiProperty({ example: 42000 })
  value: number;

  @ApiProperty({ example: 42000 })
  senderUniqueAddresses: number;

  @ApiProperty({ example: 42000 })
  recipientUniqueAddresses: number;
}

export class UniqueAddressGrowingPerDay {
  @ApiProperty({ example: '2021-01-15' })
  date: string;

  @ApiProperty({ example: 42000 })
  value: number;
}
