# Stage 1 - build the api server
FROM node:16-alpine AS BUILD_SERVER

WORKDIR /usr/src/app

RUN wget -qO- https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json pnpm-*.yaml ./

RUN pnpm install --frozen-lockfile --filter=api

COPY . .

RUN pnpm run build --filter=api

# Stage 2 - Run the built application
FROM node:16-alpine AS RUNTIME_CONTAINER

WORKDIR /usr/src/app

RUN wget -qO- https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json pnpm-*.yaml ./
COPY api/prisma ./api/prisma

RUN pnpm install --frozen-lockfile --prod --filter=api

COPY --from=BUILD_SERVER /usr/src/app/api/dist ./api/dist

ENV NODE_ENV production

EXPOSE 4000
CMD [ "pnpm", "run", "start", "--filter=api" ]
