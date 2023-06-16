FROM node:hydrogen-alpine3.18

WORKDIR /usr/src/app

COPY out ./
COPY package.json ./

COPY account.json .env ./

RUN npm install

CMD [ "npm", "run", "start" ]