import { FileData } from "./../utils";
import { Worker, Queue } from "bullmq";
import createDebug from "debug";
import Redis from "ioredis";
import { format, subDays } from "date-fns";
import { tweet } from "./twit";
import { microToStacks } from "../utils";

const queueName = "tweet-stats";
const debug = createDebug(`queue:${queueName}`);
const redisClient = new Redis();

//5432, "23.88.56.241"
interface QueueArgs {
  currentData: FileData;
}

export const tweetStats = new Queue<QueueArgs>(queueName, {
  connection: redisClient,
});
console.log("before starting worker");

const worker = new Worker(
  queueName,
  async (job) => {
    console.log("gets here");
    const { currentData } = job.data;

    const { nbTxsPerDay, uniqueAddressGrowingPerDay, txsFeePerDay } =
      currentData;
    tweet(
      // Date of the day before ( to make sure we have all the data )
      `Stats from Stacks 2.0 blockchain on ${format(
        subDays(new Date(), 1),
        "yyyy-MM-dd"
      )} :\n  
${nbTxsPerDay[nbTxsPerDay.length - 2].value} transactions
${
  uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 2].value
} unique addresses (+${
        uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 2]
          .value -
        uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 3].value
      } last 24h)
${microToStacks(
  txsFeePerDay[txsFeePerDay.length - 2].value
)} STX paid in transaction fees
     `
    );

    debug(`Tweeting status`);
  },
  { connection: redisClient }
);

worker.on("failed", async (job, err) => {
  const { status } = job.data;

  debug(`${job.id} has failed for for ${status}   : ${err.message}`);
});
