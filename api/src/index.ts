import { writeFileSync } from "fs";
import Fastify from "fastify";
import fetch from "node-fetch";
import { generateNbTxsPerDay } from "./tasks/generateNbTxsPerDay";
import { generateUniqueAddressGrowingPerDay } from "./tasks/generateUniqueAddressGrowingPerDay";
import { readData } from "./utils";

let cacheData: any = false;
async function generateDataStats() {
  const currentData = readData();
  console.log("Starting number of transactions...");
  const nbTxsPerDay = await generateNbTxsPerDay(currentData.nbTxsPerDay);
  console.log("Number of transactions generated");

  console.log("Starting number of unique addresses...");
  const uniqueAddressGrowingPerDay = await generateUniqueAddressGrowingPerDay(
    currentData.uniqueAddressGrowingPerDay
  );
  console.log("Number of unique addresses generated");

  const fileData = { nbTxsPerDay, uniqueAddressGrowingPerDay };

  writeFileSync("./data.json", JSON.stringify(fileData), { encoding: "utf-8" });
  cacheData = fileData;
}

generateDataStats()
  .then(() => {
    console.log("First data generated");
  })
  .catch((e) => {
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

    if (token === process.env.TOKEN) {
      console.log("Request data starting...");
      generateDataStats()
        .then(async () => {
          console.log("Request data generated");

          /**
           * On production we call a webhook URL that will regenerate the
           * static client site
           */
          if (process.env.NODE_ENV === "production") {
            const response = await fetch(process.env.REBUILD_WEBHOOK_URL!, {
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
