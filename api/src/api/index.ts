import { FastifyInstance } from "fastify";
import { dailyTransactions } from "./dailyTransactions";

export async function routes(fastify: FastifyInstance) {
  fastify.get("/dailyTransactions", dailyTransactions);
}
