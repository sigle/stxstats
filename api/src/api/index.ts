import { FastifyInstance } from 'fastify';
import { dailyTransactions } from './dailyTransactions';
import { dailyTransactionsNetworkFees } from './dailyTransactionsNetworkFees';

export async function routes(fastify: FastifyInstance) {
  fastify.get('/dailyTransactions', dailyTransactions);
  fastify.get('/dailyTransactionsNetworkFees', dailyTransactionsNetworkFees);
}
