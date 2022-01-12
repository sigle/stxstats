# stxstats API

This service is responsible of generating the data used by the client. It expose this data via the http protocol on port 4000.

## Endpoints

### Daily transactions count

`https://api.stxstats.co/api/dailyTransactions` - Get the daily transactions count of the Stacks Blockchain.

Sample Response:

```json
[
  { "date": "2021-01-14", "txCount": 46 },
  { "date": "2021-01-15", "txCount": 1537 },
  { "date": "2021-01-16", "txCount": 3011 }
]
```
