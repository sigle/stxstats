import { cleanEnv, str } from "envalid";

export const config = cleanEnv(process.env, {
  TOKEN: str(),
  REBUILD_WEBHOOK_URL: str(),
  NODE_ENV: str({ choices: ["development", "test", "production"] }),
});
