import { Queue } from "bullmq";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { FileData } from "./types/FileData";

/**
 * @description Convert micro to stacks.
 * @param amountInMicroStacks - the amount of microStacks to convert
 */
export const microToStacks = (amountInMicroStacks: string | number) =>
  Number(amountInMicroStacks) / Math.pow(10, 6);

// Reading current data.json
export const readData = (): FileData | undefined => {
  const doesDataExist = existsSync("./data.json");
  if (doesDataExist) {
    const data = readFileSync("./data.json", "utf-8");
    return JSON.parse(data);
  } else {
    console.log("Current data does not exist");
    return undefined;
  }
};

// Writing to data.json
export const writeData = function (fileData: FileData) {
  writeFileSync("./data.json", JSON.stringify(fileData), {
    encoding: "utf-8",
  });
};

// Clean up previous cron and start a new one
export const startCron = async (
  queue: Queue,
  queueName: string,
  cronSetup: string
) => {
  const jobs = await queue.getRepeatableJobs();

  if (jobs) {
    for (const job of jobs) {
      await queue.removeRepeatableByKey(job.key);
    }
  }

  // After first data is generated we can setup the various cron jobs
  await queue.add(queueName, {}, { repeat: { cron: cronSetup } });
};

/**
 * First day of stacks 2.0
 */
export const startDate = new Date(2021, 0, 14);
