import 'colors';
import { Server as s, IncomingMessage, ServerResponse } from 'http';

import dotenv from 'dotenv';
import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import { WebSocket ,Server } from 'ws';
import db_connection from 'config/db_connection';
import { initSocket } from 'config/ws_connection';

import { userRoutes, messageRouter } from './src/routes';

import { globalErrorMiddleware } from '@/middlewares';

dotenv.config({ path: 'config/config.env' });

const app: FastifyInstance<s, IncomingMessage, ServerResponse> = fastify();
app.register(swagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Fastify API',
      description: 'Documentation for Fastify API',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  exposeRoute: true,
});

app.register(userRoutes, { prefix: '/api/users' });
app.register(messageRouter, { prefix: '/api/messages' });
globalErrorMiddleware(app);

let wss: Server; // define wss outside the function

export const start = async (): Promise<void> => {
  try {
    db_connection(); // connect to MongoDB

    wss = initSocket(3001);
    await app.listen(3001);
    console.log(`Server listening on http://localhost:3001`.green);
  } catch (error) {
    console.error('Error starting server:'.red, error);
  }
};

start();

export { wss };
