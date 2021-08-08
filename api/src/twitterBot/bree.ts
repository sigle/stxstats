import Bree from "bree";

//This is helper necessary for bree to work w typescript
function typescript_worker() {
  const path = require("path");
  require("ts-node").register();
  const workerData = require("worker_threads").workerData;
  require(path.resolve(__dirname, workerData.__filename));
}

export const bree = new Bree({
  jobs: [
    {
      name: "twitterBot",
      cron: "0 22 * * *",
      path: typescript_worker,
      worker: {
        workerData: { __filename: "./jobs/twitterBot.ts" },
      },
    },
  ],
});
