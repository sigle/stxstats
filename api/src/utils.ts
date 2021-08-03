import { readFileSync, writeFileSync } from "fs";

export interface Result {
  date: string;
  value: number;
}

export interface FileData {
  nbTxsPerDay: Result[];
  uniqueAddressGrowingPerDay: Result[];
}

// Reading current data.json
export const readData = (): FileData => {
  const data = readFileSync("./data.json", "utf-8");
  return JSON.parse(data);
};

// Writing to data.json
export const writeData = function (fileData: FileData) {
  writeFileSync("./data.json", JSON.stringify(fileData), {
    encoding: "utf-8",
  });
};

/**
 * First day of stacks 2.0
 */
export const startDate = new Date(2021, 0, 14);
