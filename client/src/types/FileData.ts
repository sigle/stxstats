export interface Result {
  date: string;
  value: number;
}

export interface ResultActiveAddresses {
  date: string;
  value: number;
  senderUniqueAddresses: number;
  recipientUniqueAddresses: number;
}

export interface FileData {
  nbTxsPerDay: Result[];
  uniqueAddressGrowingPerDay: Result[];
  txsFeePerDay: Result[];
  activeAddressesPerDay: ResultActiveAddresses[];
}
