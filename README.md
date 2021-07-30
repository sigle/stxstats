<p align="center">
  <img src="https://github.com/sigle/stxstats/blob/main/client/public/images/stx_stats_logo_black.svg?raw=true" width="250" alt="Stx stats logo">
</p>

# stxstats

Get the latest data from Stacks 2.0.

This project helps to visualise the growth of the stacks 2.0 blockchain over time. If there is a metric you would like to see that is not there feel free to open an issue!

## Development

### Running stacks docker images

Run `docker-compose -f docker-compose.dev.yml up -d`.

### Running local client

1. `cd client`
2. `npm install`
3. `npm run dev`

## Deploy to production

1. On a new server clone the repository
2. Edit docker compose file an change the `TOKEN` and `REBUILD_WEBHOOK_URL` env variable
3. Run `docker-compose up -d`
