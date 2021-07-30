/**
 * @description Convert micro to stacks.
 * @param amountInMicroStacks - the amount of microStacks to convert
 */
export const microToStacks = (amountInMicroStacks: string | number) =>
  Number(amountInMicroStacks) / Math.pow(10, 6);
