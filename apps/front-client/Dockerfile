FROM node:14-alpine

WORKDIR /home/node/app

COPY ./apps/front-client/src .

COPY ./package.json package.json

RUN npm install

EXPOSE 3000

USER node

CMD ["npx", "serve", "-s", ".", "-l", "3000"]