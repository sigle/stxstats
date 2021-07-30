# Stage 1 - build the api server
FROM node:14-alpine AS BUILD_SERVER

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

# Stage 2 - Run the built application
FROM node:14-alpine AS RUNTIME_CONTAINER

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --only=production

COPY --from=BUILD_SERVER /usr/src/app/dist ./dist

ENV NODE_ENV production

EXPOSE 4000
CMD [ "npm", "run", "start" ]
