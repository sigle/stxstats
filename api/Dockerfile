# Stage 1 - build the api server
FROM node:16-alpine AS build

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@7.6.0 --activate

COPY package.json pnpm-*.yaml ./
COPY api/package.json ./api/

RUN pnpm install --frozen-lockfile --filter=api

COPY . .

RUN pnpm --filter=api prisma:generate
RUN pnpm --filter=api run build

# Stage 2 - Run the built application
FROM node:16-alpine AS production

WORKDIR /usr/src/app

RUN corepack enable && corepack prepare pnpm@7.6.0 --activate

COPY package.json pnpm-*.yaml ./
COPY api/package.json ./api/
COPY api/prisma ./api/prisma

RUN pnpm install --frozen-lockfile --prod --filter=api
RUN pnpm --filter=api prisma:generate

COPY --from=build /usr/src/app/api/dist ./api/dist

ENV NODE_ENV production

EXPOSE 4000
CMD [ "pnpm", "--filter=api", "run", "start"]
