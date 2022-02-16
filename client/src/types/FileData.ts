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

export interface StxStats {
  blockHeight: number;
  lastBlockTime: number;
  totalTransactions: number;
  transactionsLast24h: number;
  totalStacked: number;
  nextCycleIn: number;
}

export interface PriceInUsd {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
}

export interface PriceData {
  bitcoin: PriceInUsd;
  blockstack: PriceInUsd;
}

export interface DashboardData {
  stxStats: StxStats;
  stxPriceEvolution: Result[];
  priceData: PriceData;
}

export type PriceResult = [number, number];
