/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActiveAddressesPerDay } from '../models/ActiveAddressesPerDay';
import type { DailyTransactions } from '../models/DailyTransactions';
import type { DailyTransactionsNetworkFees } from '../models/DailyTransactionsNetworkFees';
import type { UniqueAddressGrowingPerDay } from '../models/UniqueAddressGrowingPerDay';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {
  /**
   * @returns any
   * @throws ApiError
   */
  public static statsControllerDashboard(): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/stats/dashboard',
    });
  }

  /**
   * @returns DailyTransactions Get the daily transactions count of the Stacks Blockchain.
   * @throws ApiError
   */
  public static statsControllerDailyTransactions(): CancelablePromise<
    Array<DailyTransactions>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/stats/dailyTransactions',
    });
  }

  /**
   * @returns DailyTransactionsNetworkFees Get the daily amount of transactions fees paid to miners of the Stacks Blockchain.
   * @throws ApiError
   */
  public static statsControllerDailyTransactionsNetworkFees(): CancelablePromise<
    Array<DailyTransactionsNetworkFees>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/stats/dailyTransactionsNetworkFees',
    });
  }

  /**
   * @returns ActiveAddressesPerDay Get the daily active addresses of the Stacks Blockchain.
   * @throws ApiError
   */
  public static statsControllerActiveAddressesPerDay(): CancelablePromise<
    Array<ActiveAddressesPerDay>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/stats/activeAddressesPerDay',
    });
  }

  /**
   * @returns UniqueAddressGrowingPerDay Get the daily growing unique active addresses of the Stacks Blockchain.
   * @throws ApiError
   */
  public static statsControllerUniqueAddressGrowingPerDay(): CancelablePromise<
    Array<UniqueAddressGrowingPerDay>
  > {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/stats/uniqueAddressGrowingPerDay',
    });
  }

  /**
   * @returns any The Health Check is successful
   * @throws ApiError
   */
  public static healthControllerCheck(): CancelablePromise<{
    status?: string;
    info?: Record<string, Record<string, string>> | null;
    error?: Record<string, Record<string, string>> | null;
    details?: Record<string, Record<string, string>>;
  }> {
    return __request(OpenAPI, {
      method: 'GET',
      url: '/health',
      errors: {
        503: `The Health Check is not successful`,
      },
    });
  }
}
