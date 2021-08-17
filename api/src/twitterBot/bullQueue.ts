import { Worker, Queue, QueueScheduler } from "bullmq";
import createDebug from "debug";
import Redis from "ioredis";
import { format, subDays } from "date-fns";
import { tweet } from "./twit";
import { microToStacks, readData } from "../utils";
import { config } from "../config";

const queueName = "tweet-stats";
const debug = createDebug(`queue:${queueName}`);
const redisClient = new Redis({ password: config.REDIS_PASSWORD });

export const tweetStatsQueueScheduler = new QueueScheduler(queueName, {
  connection: redisClient,
});
export const tweetStatsQueue = new Queue<{}>(queueName, {
  connection: redisClient,
});

const worker = new Worker(
  queueName,
  async () => {
    const currentData = readData();
    if (!currentData) {
      debug("No current data about STX blockchain available");
      return;
    }

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

  debug(`${job.id} has failed for for ${status}: ${err.message}`);
});
