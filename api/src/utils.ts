import { readFileSync, writeFileSync, existsSync } from "fs";

export interface Result {
  date: string;
  value: number;
}

export interface FileData {
  nbTxsPerDay: Result[];
  uniqueAddressGrowingPerDay: Result[];
  txsFeePerDay: Result[];
}

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

/**
 * First day of stacks 2.0
 */
export const startDate = new Date(2021, 0, 14);

// Comparing dates to prevent duplication
export const areDatesTheSameDay = (a: Date, b: Date) => {
  if (a.toString().slice(0, 10) === b.toString().slice(0, 10)) {
    return true;
  } else {
    return false;
  }
};
