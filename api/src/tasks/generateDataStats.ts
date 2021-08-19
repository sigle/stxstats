import { generateNbTxsPerDay } from "./generateNbTxsPerDay";
import { generateUniqueAddressGrowingPerDay } from "./generateUniqueAddressGrowingPerDay";
import { generateTxsFeePerDay } from "./generateTxsFeePerDay";
import { readData, writeData } from "../utils";

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

  return fileData;
}
