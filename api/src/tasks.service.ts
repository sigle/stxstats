import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { AxiosResponse } from 'axios';
import { format, subDays } from 'date-fns';
import * as Twit from 'twit';
import { EnvironmentVariables } from './env.validation';
import {
  ActiveAddressesPerDay,
  DailyTransactions,
  DailyTransactionsNetworkFees,
  UniqueAddressGrowingPerDay,
} from './stats/stats.entity';

/**
 * @description Convert micro to stacks.
 * @param amountInMicroStacks - the amount of microStacks to convert
 */
const microToStacks = (amountInMicroStacks: string | number) =>
  Number(amountInMicroStacks) / Math.pow(10, 6);

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private readonly twitter?: Twit;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly httpService: HttpService
  ) {
    const twitterAccessToken = this.configService.get('TWITTER_ACCESS_TOKEN');
    if (twitterAccessToken) {
      this.twitter = new Twit({
        consumer_key: this.configService.get('TWITTER_API_KEY'),
        consumer_secret: this.configService.get('TWITTER_API_SECRET_KEY'),
        access_token: this.configService.get('TWITTER_ACCESS_TOKEN'),
        access_token_secret: this.configService.get(
          'TWITTER_ACCESS_TOKEN_SECRET'
        ),
        timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
        strictSSL: true, // optional - requires SSL certificates to be valid.
      });
    }
  }

  @Cron('0 22 * * *')
  async tweetStatsCron() {
    this.logger.debug('Starting tweet job');

    const apiUrl = `http://localhost:4000`;

    const [
      { data: dailyTransactions },
      { data: dailyTransactionsNetworkFees },
      { data: activeAddressesPerDay },
      { data: uniqueAddressGrowingPerDay },
    ] = await Promise.all([
      this.httpService.axiosRef.get<
        unknown,
        AxiosResponse<DailyTransactions[]>
      >(`${apiUrl}/stats/dailyTransactions`),
      this.httpService.axiosRef.get<
        unknown,
        AxiosResponse<DailyTransactionsNetworkFees[]>
      >(`${apiUrl}/stats/dailyTransactionsNetworkFees`),
      this.httpService.axiosRef.get<
        unknown,
        AxiosResponse<ActiveAddressesPerDay[]>
      >(`${apiUrl}/stats/activeAddressesPerDay`),
      this.httpService.axiosRef.get<
        unknown,
        AxiosResponse<UniqueAddressGrowingPerDay[]>
      >(`${apiUrl}/stats/uniqueAddressGrowingPerDay`),
    ]);

    if (this.twitter) {
      const tweetId = await this.sendTweet(
        // Date of the day before ( to make sure we have all the data )
        `Stats from Stacks blockchain on ${format(
          subDays(new Date(), 1),
          'yyyy-MM-dd'
        )} :\n
${dailyTransactions[dailyTransactions.length - 2].txCount} transactions
${
  uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 2].value
} unique addresses (+${
          uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 2]
            .value -
          uniqueAddressGrowingPerDay[uniqueAddressGrowingPerDay.length - 3]
            .value
        } last 24h)
${microToStacks(
  dailyTransactionsNetworkFees[dailyTransactionsNetworkFees.length - 2].txFee
)} STX paid in transaction fees
${
  activeAddressesPerDay[activeAddressesPerDay.length - 2].value
} active addresses on this date
           `
      );
      this.logger.debug(`https://twitter.com/stxstats/status/${tweetId}`);
    }

    this.logger.debug('End tweet job');
  }

  private sendTweet(status: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.twitter.post(
        'statuses/update',
        { status },
        function (err, data: any) {
          if (err) {
            reject(err);
            return;
          }
          resolve(data.id_str);
        }
      );
    });
  }
}
