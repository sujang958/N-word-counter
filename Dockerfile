FROM node:hydrogen-alpine3.18

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

CMD [ "npm", "run", "start" ]