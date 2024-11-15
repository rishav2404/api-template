import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import * as httpContext from 'express-http-context';
import dotenv from 'dotenv';
import logger from './utils/logger';

import service from './services';
import { BaseRouter, UserRouter } from './routes';

dotenv.config();

async function startServer() {
  const app = express();

  app.use(httpContext.middleware);

  await service({ app });
  app.use(express.json());

  app.use(cors());
  app.use(helmet());

  app.use('/v1', [BaseRouter, UserRouter]);

  app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
    if (!err) {
      return next();
    }

    switch (err.name) {
      case 'BadRequestError':
        return res.status(400).json({ status: 400, message: err.message });
      case 'UnauthorizedError':
        return res.status(401).json({ status: 401, message: err.message });
      case 'ForbiddenError':
        return res.status(403).json({ status: 403, message: err.message });
      case 'NotFoundError':
        return res.status(404).json({ status: 404, message: err.message });
      case 'ConflictError':
        return res.status(409).json({ status: 409, message: err.message });
      default:
        return res.status(500).json({ status: 500, message: 'Internal server error', err });
    }
  });

  app.use((_req, res) => {
    res.status(404).json({
      status: 404,
      message: 'Requested resource not found!',
    });
  });

  const server = createServer(app);
  const port = process.env.PORT || 7000;
  const mess = process.env.MESSAGE || 'Hello World';

  server
    .on('error', () => {
      console.log('Something went wrong, could not initialize the server');
      process.exit(1);
    })
    .listen(port, () => {
      logger.info(`Server listening on ${mess}`);
      console.log(`Server listening on portsss ${port} with message ${mess}!`);
    });
}

startServer();
