# stxstats API

This service is responsible of generating the data used by the client. It expose this data via the http protocol on port 4000.

A public API is available at https://api.stxstats.co/, note that the data is updated every 2 minutes.

## Endpoints

### Daily transactions count

`https://api.stxstats.co/dailyTransactions` - Get the daily transactions count of the Stacks Blockchain.

Sample Response:

```json
[
  { "date": "2021-01-14", "txCount": 46 },
  { "date": "2021-01-15", "txCount": 1537 },
  { "date": "2021-01-16", "txCount": 3011 }
]
```

### Daily transactions network fees

`https://api.stxstats.co/dailyTransactionsNetworkFees` - Get the daily amount of transactions fees paid to miners of the Stacks Blockchain.

Sample Response:

```json
[
  { "date": "2021-01-14", "txFee": 8660 },
  { "date": "2021-01-15", "txFee": 344805 },
  { "date": "2021-01-16", "txFee": 520020 }
]
```
