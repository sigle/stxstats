import { cleanEnv, str } from "envalid";

export const config = cleanEnv(process.env, {
  TOKEN: str(),
  REBUILD_WEBHOOK_URL: str(),
  TWITTER_API_KEY: str(),
  TWITTER_API_SECRET_KEY: str(),
  TWITTER_ACCESS_TOKEN: str(),
  TWITTER_ACCESS_TOKEN_SECRET: str(),
  DATABASE_URL: str(),
  REDIS_PASSWORD: str(),
});
