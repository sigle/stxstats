import Twit from "twit";
import { config } from "../config";

export const T = new Twit({
  consumer_key: config.TWITTER_API_KEY,
  consumer_secret: config.TWITTER_API_SECRET_KEY,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

export const tweet = (status: string) => {
  T.post("statuses/update", { status }, function (err, data: any, response) {
    console.log(err);
    if (!err) {
      console.log(`https://twitter.com/stxstats/status/${data.id_str}`);
    }
  });
};
