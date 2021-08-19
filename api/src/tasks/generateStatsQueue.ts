import { Worker, Queue, QueueScheduler } from "bullmq";
import createDebug from "debug";
import Redis from "ioredis";
import { generateDataStats } from "../index";
import { config } from "../config";

const queueName = "generate-data-stats";
const debug = createDebug(`queue:${queueName}`);
const redisClient = new Redis(config.REDIS_URL);

export const generateDataStatsQueueScheduler = new QueueScheduler(queueName, {
  connection: redisClient,
});
export const generateDataStatsQueue = new Queue<{}>(queueName, {
  connection: redisClient,
});

const worker = new Worker(
  queueName,
  async () => {
    await generateDataStats()
      .then(() => {
        debug(`Successfully generated data`);
      })
      .catch((err) => {
        debug("failed to generate data", err);
      });
  },
  { connection: redisClient }
);

worker.on("failed", async (job, err) => {
  const { status } = job.data;

  debug(`${job.id} has failed for for ${status}: ${err.message}`);
});
