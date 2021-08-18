require("dotenv").config();
import Fastify from "fastify";
import fetch from "node-fetch";
import { generateNbTxsPerDay } from "./tasks/generateNbTxsPerDay";
import { generateUniqueAddressGrowingPerDay } from "./tasks/generateUniqueAddressGrowingPerDay";
import { generateTxsFeePerDay } from "./tasks/generateTxsFeePerDay";
import { readData, writeData, FileData } from "./utils";
import { config } from "./config";
import { tweetStatsQueue } from "./twitterBot/bullQueue";

let cacheData: FileData | false = false;
async function generateDataStats() {
  const currentData = readData();
  console.log("Starting number of transactions...");
  const nbTxsPerDay = await generateNbTxsPerDay(currentData?.nbTxsPerDay);
  console.log("Number of transactions generated");

  console.log("Starting number of unique addresses...");
  const uniqueAddressGrowingPerDay = await generateUniqueAddressGrowingPerDay();
  console.log("Number of unique addresses generated");

  console.log("Starting total fees...");
  const txsFeePerDay = await generateTxsFeePerDay(currentData?.txsFeePerDay);
  console.log("Total fees generated");

  const fileData = {
    nbTxsPerDay,
    uniqueAddressGrowingPerDay,
    txsFeePerDay,
  };
  writeData(fileData);
  cacheData = fileData;
}

generateDataStats()
  .then(async () => {
    console.log("First data generated");
    const jobs = await tweetStatsQueue.getRepeatableJobs();

    if (jobs) {
      for await (let job of jobs) {
        tweetStatsQueue.removeRepeatableByKey(job.key);
      }
    }

    // After first data is generated we can setup the various cron jobs
    await tweetStatsQueue.add(
      "tweet-stats",
      {},
      // every day at 10PM
      { repeat: { cron: "0 22 * * *" } }
    );
  })
  .catch((e) => {
    console.error(e);
    throw e;
  });

const fastify = Fastify({
  logger: false,
});

/**
 * Return the latest generated data
 */
fastify.get("/", (_, reply) => {
  reply.send(cacheData);
});

/**
 * Call this route to generate the data again
 * Used by an external cronjob multiple time a day
 */
fastify.get<{ Querystring: { token: string } }>(
  "/generate-data",
  (request, reply) => {
    const token = request.query && request.query.token;

    if (token === config.TOKEN) {
      console.log("Request data starting...");
      generateDataStats()
        .then(async () => {
          console.log("Request data generated");

          /**
           * On production we call a webhook URL that will regenerate the
           * static client site
           */
          if (config.isProduction) {
            const response = await fetch(config.REBUILD_WEBHOOK_URL, {
              method: "GET",
            });
            const data = await response.json();
            console.log(`Called webhook`, data);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      reply.send({ success: true });
      return;
    }

    reply.send({ success: false });
  }
);

// Run the server!
fastify.listen(4000, "0.0.0.0", (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
