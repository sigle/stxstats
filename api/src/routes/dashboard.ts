import { FastifyInstance } from "fastify";
import { subDays } from "date-fns";
import fetch from "node-fetch";
import { prisma } from "../prisma";

/**
 * Dashboard statistics route
 */
export const registerRoute = (fastify: FastifyInstance) => {
  fastify.get("/dashboard", async (_, reply) => {
    const [blockHeight, totalTransactions, transactionsLast24h, poxInfos] =
      await Promise.all([
        // Get the latest block infos
        (async () => {
          const lastBlock = await prisma.blocks.findFirst({
            select: { block_height: true, burn_block_time: true },
            orderBy: { block_height: "desc" },
          });
          return lastBlock;
        })(),
        // Get the total number of transactions
        (async () => {
          const totalTransactions = await prisma.txs.count();
          return totalTransactions;
        })(),
        // Get the last 24h transactions
        (async () => {
          const now = new Date();
          const yesterday = subDays(now, 1);
          const transactionsLast24h = await prisma.txs.count({
            where: {
              burn_block_time: {
                gte: Math.floor(yesterday.getTime() / 1000),
                lt: Math.floor(now.getTime() / 1000),
              },
            },
          });
          return transactionsLast24h;
        })(),
        // Get the POX infos
        (async () => {
          const response = await fetch(
            "https://stacks-node-api.mainnet.stacks.co/v2/pox",
            {
              method: "GET",
            }
          );
          const data = await response.json();
          return {
            totalStacked: data.current_cycle.stacked_ustx,
            nextCycleIn: data.next_reward_cycle_in,
          };
        })(),
      ]);

    reply.send({
      blockHeight: blockHeight?.block_height || 0,
      lastBlockTime: blockHeight?.burn_block_time || 0,
      totalTransactions,
      transactionsLast24h,
      totalStacked: poxInfos.totalStacked,
      nextCycleIn: poxInfos.nextCycleIn,
    });
  });
};
