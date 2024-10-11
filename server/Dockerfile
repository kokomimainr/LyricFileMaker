FROM node:22.0.0-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY . .

EXPOSE 80

CMD node ./src/app.js