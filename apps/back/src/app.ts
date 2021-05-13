import express from 'express';
import cors from 'cors';
import http from 'http';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongodbStart from './db/db';
import serverApollo from './graphql/graphqlServer';
import bodyParser from 'body-parser';

dotenv.config();
const port = process.env.PORT || 5000;

// initialize express server with apollo and cors
mongodbStart();
const app = express();
app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

serverApollo.applyMiddleware({
  app,
  cors: false,
});

const httpServer = new http.Server(app);

httpServer.listen(port, () =>
  console.log(`Apollo Server on http://localhost:${port}/graphql`)
);
