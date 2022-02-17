import { FastifyInstance } from 'fastify';
import { dashboard } from './dashboard';
import { dailyTransactions } from './dailyTransactions';
import { dailyTransactionsNetworkFees } from './dailyTransactionsNetworkFees';

export async function routes(fastify: FastifyInstance) {
  fastify.get('/dashboard', dashboard);
  fastify.get('/dailyTransactions', dailyTransactions);
  fastify.get('/dailyTransactionsNetworkFees', dailyTransactionsNetworkFees);
}
