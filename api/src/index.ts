require("dotenv").config();
import Fastify from "fastify";
import { generateNbTxsPerDay } from "./tasks/generateNbTxsPerDay";
import { generateUniqueAddressGrowingPerDay } from "./tasks/generateUniqueAddressGrowingPerDay";
import { generateTxsFeePerDay } from "./tasks/generateTxsFeePerDay";
import { readData, writeData, FileData, startCron } from "./utils";
import { tweetStatsQueue } from "./twitterBot/bullQueue";
import { generateDataStatsQueue } from "./tasks/generateStatsQueue";

let cacheData: FileData | false = false;
export async function generateDataStats() {
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
    //@every day 10 PM
    startCron(tweetStatsQueue, "tweet-stats", "0 22 * * *");
    // Every 3rd hour
    startCron(generateDataStatsQueue, "generate-data-stats", "0 */3 * * *");
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

// Run the server!
fastify.listen(4000, "0.0.0.0", (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
