import { writeFileSync } from "fs";
import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";
import { addDays, isBefore, format, subDays } from "date-fns";
import fetch from "node-fetch";

const prisma = new PrismaClient();

// We take one day before now to not go over all of the past
// dates that are saved in memory
const startDate = subDays(new Date(), 1);
let cacheData: any = false;

async function generateNbTxsPerDay() {
  const endDate = new Date();
  let iteratorDate = startDate;
  const result = [];

  // Loop day by day between both dates
  while (isBefore(iteratorDate, endDate)) {
    const dayAfter = addDays(iteratorDate, 1);

    const transactionsCount = await prisma.txs.count({
      where: {
        burn_block_time: {
          gte: iteratorDate.getTime() / 1000,
          lt: dayAfter.getTime() / 1000,
        },
      },
    });

    const dateFormatted = format(iteratorDate, "yyyy-MM-dd");
    result.push({ date: dateFormatted, value: transactionsCount });

    iteratorDate = addDays(iteratorDate, 1);
  }

  return result;
}

async function generateUniqueAddressGrowingPerDay() {
  const endDate = new Date();
  let iteratorDate = startDate;
  const result = [];
  // Using an object is better for performance here
  const uniqueAddresses: { [key: string]: true } = {};

  // Loop day by day between both dates
  while (isBefore(iteratorDate, endDate)) {
    const dayAfter = addDays(iteratorDate, 1);
    // Find all the blocks mined on that day
    const blocks = await prisma.blocks.findMany({
      where: {
        burn_block_time: {
          gte: iteratorDate.getTime() / 1000,
          lt: dayAfter.getTime() / 1000,
        },
      },
      select: {
        block_height: true,
      },
    });

    const dateFormatted = format(iteratorDate, "yyyy-MM-dd");

    if (blocks.length > 0) {
      const startBlock = blocks[0].block_height;
      const endBlock = blocks[blocks.length - 1].block_height;

      // Find all the events happening on that day by blocks height
      const events = await prisma.stx_events.findMany({
        where: {
          block_height: {
            gte: startBlock,
            lte: endBlock,
          },
        },
        select: {
          sender: true,
          recipient: true,
        },
      });

      // Add new entries for uniqueness
      events.forEach((event) => {
        if (event.sender && !uniqueAddresses[event.sender]) {
          uniqueAddresses[event.sender] = true;
        }
        if (event.recipient && !uniqueAddresses[event.recipient]) {
          uniqueAddresses[event.recipient] = true;
        }
      });

      const numberOfUniqueAddresses = Object.keys(uniqueAddresses).length;

      result.push({ date: dateFormatted, value: numberOfUniqueAddresses });
    } else {
      result.push({ date: dateFormatted, value: 0 });
    }

    iteratorDate = addDays(iteratorDate, 1);
  }

  return result;
}

async function generateDataStats() {
  console.log("Starting number of transactions...");
  const nbTxsPerDay = await generateNbTxsPerDay();
  console.log("Number of transactions generated");

  console.log("Starting number of unique addresses...");
  const uniqueAddressGrowingPerDay = await generateUniqueAddressGrowingPerDay();
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
