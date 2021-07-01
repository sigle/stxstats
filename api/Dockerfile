FROM node:14

WORKDIR /usr/src/app

COPY package.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

ENV NODE_ENV production

EXPOSE 4000
CMD [ "npm", "run", "start" ]
