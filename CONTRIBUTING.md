# Contributing to Stxstats

## Requirements

- [Node](https://nodejs.org/en/) 16.0.0+
- [pnpm](https://pnpm.io/) 6.0+
- [Docker](https://www.docker.com/)

## Pull Requests

For non-bug-fixes, please open an issue first and discuss your idea to make sure we're on the same page.

**Before submitting a pull request**, please make sure the following is done:

- Fork the repository and create a new branch from `main`.
- Must be **isolated**. Avoid grouping many, unrelated changes in a single PR.

## Structure

Stxstats is a monorepo made of 2 parts applications:

1. `api` folder - Contains the node API that is generating the stats
2. `client` folder - Contains the next.js website client, the client is compiled as a static website

## Development Workflow

To setup the project locally you first need to fork the project on Github (top right on the project page). Then clone the project: `git clone git@github.com:yourname/stxstats.git`.

Now you can run run the following command to install the dependencies for the project:

```sh
pnpm install
```

### Start the stacks node locally

We use docker to create the stacks node and manage the services.

```sh
docker-compose -f docker-compose.dev.yml up -d
```
