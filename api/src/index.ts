require('dotenv').config();
import Fastify from 'fastify';
import { readData, startCron } from './utils';
import { tweetStatsQueue } from './twitterBot/bullQueue';
import { generateDataStatsQueue } from './tasks/generateStatsQueue';
import { generateDataStats } from './tasks/generateDataStats';
import { routes } from './api';

generateDataStats()
  .then(async () => {
    console.log('First data generated');
    // Every day 10 PM
    startCron(tweetStatsQueue, 'tweet-stats', '0 22 * * *');
    // Every 3rd hour
    startCron(generateDataStatsQueue, 'generate-data-stats', '0 */3 * * *');
  })
  .catch((e) => {
    console.error(e);
    throw e;
  });

const fastify = Fastify({
  logger: false,
});

/**
 * Return the latest generated data
 */
fastify.get('/', (_, reply) => {
  const currentData = readData();
  reply.send(currentData || false);
});

fastify.register(routes);

// Run the server!
fastify.listen(4000, '0.0.0.0', (err, address) => {
  if (err) throw err;
  console.log(`Server is now listening on ${address}`);
});
