import { cleanEnv, str } from "envalid";

export const config = cleanEnv(process.env, {
  TWITTER_API_KEY: str(),
  REBUILD_WEBHOOK_URL: str(),
  TWITTER_API_SECRET_KEY: str(),
  TWITTER_ACCESS_TOKEN: str(),
  TWITTER_ACCESS_TOKEN_SECRET: str(),
  DATABASE_URL: str(),
  REDIS_URL: str(),
});
