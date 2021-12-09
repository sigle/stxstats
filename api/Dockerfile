# Stage 1 - build the api server
FROM node:14-alpine AS BUILD_SERVER

WORKDIR /usr/src/app

RUN wget -qO- https://get.pnpm.io/v6.16.js | node - add --global pnpm

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

# Stage 2 - Run the built application
FROM node:14-alpine AS RUNTIME_CONTAINER

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma

RUN pnpm install --frozen-lockfile --prod

COPY --from=BUILD_SERVER /usr/src/app/dist ./dist

ENV NODE_ENV production

EXPOSE 4000
CMD [ "pnpm", "run", "start" ]
