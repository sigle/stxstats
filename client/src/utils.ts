import { differenceInMinutes, fromUnixTime, toDate } from 'date-fns';

/**
 * @description Convert micro to stacks.
 * @param amountInMicroStacks - the amount of microStacks to convert
 */
export const microToStacks = (amountInMicroStacks: string | number) =>
  Number(amountInMicroStacks) / Math.pow(10, 6);

export const numberWithCommas = (x: string | number | undefined): string => {
  return new Intl.NumberFormat('en-US').format(Number(x)).toString();
};

export const getLastBlockTime = (lastBlockTimestamp: number): number => {
  const currentTimestamp = Date.now();

  return differenceInMinutes(
    toDate(currentTimestamp),
    fromUnixTime(lastBlockTimestamp)
  );
};

export const numFormatter = (num: number | undefined): string | undefined => {
  if (!num) {
    return;
  }

  if (num > 1000000 && num < 1000000000) {
    return (num / 1000000).toFixed(0) + 'M';
  }

  if (num > 1000000000) {
    return (num / 1000000000).toFixed(0) + 'B';
  }
};

/**
 * @description Calculate an estimate for the next cycle.
 * @param remainingBlocks - the amount of blocks remaining before next cycle
 */
export const getNextCycle = (remainingBlocks: number) => {
  // multiply blocks remaining by 10 (average block time) and divide by 1440 (minutes in a day) to get remaining number of days
  const timeInDays = (remainingBlocks * 10) / 1440;
  if (timeInDays > 1) {
    return Math.floor(timeInDays);
  }
  return timeInDays.toFixed(2);
};
