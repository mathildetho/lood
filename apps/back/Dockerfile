FROM node:14-alpine

WORKDIR /app

COPY ./apps/back/src .
COPY ./package.json package.json

RUN npm install --production

EXPOSE 3001

USER node

CMD ["node", "main.ts"]