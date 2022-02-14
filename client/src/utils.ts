import { differenceInMinutes, fromUnixTime, toDate } from 'date-fns';

/**
 * @description Convert micro to stacks.
 * @param amountInMicroStacks - the amount of microStacks to convert
 */
export const microToStacks = (amountInMicroStacks: string | number) =>
  Number(amountInMicroStacks) / Math.pow(10, 6);

export const numberWithCommas = (x: string | number): string => {
  return new Intl.NumberFormat('en-US').format(Number(x)).toString();
};

export const getLastBlockTime = (lastBlockTimestamp: number): number => {
  const currentTimestamp = Date.now();

  return differenceInMinutes(
    toDate(currentTimestamp),
    fromUnixTime(lastBlockTimestamp)
  );
};

export const numFormatter = (num: number): string | undefined => {
  if (num > 1000000 && num < 1000000000) {
    return (num / 1000000).toFixed(0) + 'M';
  }

  if (num > 1000000000) {
    return (num / 1000000000).toFixed(0) + 'B';
  }
};

export const getNextCycle = (block: number) => {
  const timeInDays = (block * 10) / 1440;
  if (timeInDays > 1) {
    return Math.floor(timeInDays);
  }
  return timeInDays.toFixed(2);
};
