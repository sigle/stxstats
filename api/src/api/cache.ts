import NodeCache from 'node-cache';

// Cache API result for 2 minutes
export const apiCache = new NodeCache({ stdTTL: 120 });
