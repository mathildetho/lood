FROM node:14-alpine

WORKDIR /app

COPY ./apps/front-client/src .

COPY ./package.json package.json

RUN npm install --production

EXPOSE 3000

USER node

CMD ["npx", "serve", "-s", ".", "-l", "3000"]