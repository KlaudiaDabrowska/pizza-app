FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN apk add --update lsb-release

RUN npm install

COPY . .

RUN npm run build

CMD node dist/main.js
