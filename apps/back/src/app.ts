import { ApolloServer } from 'apollo-server';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (_req: Request, res: Response) => {
  res.send('Hello World');
});

// Start Server
export default app;
