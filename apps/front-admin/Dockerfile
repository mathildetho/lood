FROM node:14-alpine

WORKDIR /home/node/app

COPY ./apps/front-admin/src .
COPY ./package.json package.json

RUN npm install --production

EXPOSE 3002

USER node

CMD ["npx", "serve", "-s", ".", "-l", "3002"]