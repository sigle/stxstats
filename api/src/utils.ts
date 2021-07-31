import { readFileSync } from "fs";

export interface Result {
  date: string;
  value: number;
}

// Reading current data.json
export const readData = function () {
  const data = readFileSync("./data.json", "utf-8");
  return JSON.parse(data);
};

/**
 * First day of stacks 2.0
 */
export const startDate = new Date(2021, 0, 14);
