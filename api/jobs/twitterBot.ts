import { format, subDays } from "date-fns";
import { microToStacks, readData } from "../src/utils";
import { tweet } from "../src/twitterBot/twit";

const currentData = readData();

if (currentData) {
  const { nbTxsPerDay, uniqueAddressGrowingPerDay, txsFeePerDay } = currentData;
  tweet(
    // Date of the day before ( to make sure we have all the data )
    `Stats from stacks 2.0 blockchain on ${format(
      subDays(new Date(), 1),
      "yyyy-MM-dd"
    )} :\n  
${nbTxsPerDay[nbTxsPerDay.length - 2].value} transactions
${
  uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 2].value
} unique addresses (+${
      uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 2].value -
      uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 3].value
    } last 24h)
${microToStacks(
  txsFeePerDay[txsFeePerDay.length - 2].value
)} STX paid in transaction fees
     `
  );
}
