# Deploy to production with docker-compose

In order to follow this guide you need a VPS instance with docker and docker-compose installed.

First you need to clone the repository containing the `docker-compose.yml` file and other configuration files required for the stacks node.

```sh
git clone https://github.com/sigle/stxstats.git && cd stxstats
```

### Setup environment variables

Create a new `.env` file at the root of the repo and set the following environment variables.

```
# Variables used to secure postgres access
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
# Variables used to secure redis access
REDIS_PASSWORD=
# Variables used by the api
REBUILD_WEBHOOK_URL=
TWITTER_API_KEY=
TWITTER_API_SECRET_KEY=
TWITTER_ACCESS_TOKEN=
TWITTER_ACCESS_TOKEN_SECRET=
```

### Start the services

Before starting the services you can verify that the environment variables are properly setup. Run `docker-compose config` to see the docker-compose.yml file printed with the right values.

To start the services run

```
docker-compose up -d
```

Once the services are started properly it will take a few days to sync all the data of the network.
