import 'colors';
import dotenv from 'dotenv';
import path from 'path';
import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import WebSocket from 'ws';
// @ts-ignore
import fastifyStatic from 'fastify-static';
import db_connection from 'config/db_connection';
import { initSocket } from 'config/ws_connection';
import { userRoutes, messageRouter } from './src/routes';
import { globalErrorMiddleware } from '@/middlewares';

dotenv.config({ path: 'config/config.env' });

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();
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
app.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
});
app.register(userRoutes, { prefix: '/api/users' });
app.register(messageRouter, { prefix: '/api/messages' });
globalErrorMiddleware(app);

let wss: WebSocket.Server; // define wss outside the function

export const start = async (): Promise<void> => {
  try {
    db_connection(); // connect to MongoDB

    wss = initSocket(app.server);

    wss.on('connection', (ws) => {
      console.log('WebSocket client connected'.green);

      ws.on('message', (message) => {
        console.log('Received message:'.blue, message);
        // Handle message and send response back to client
        ws.send('Message received by server'.blue);
      });
    });

    await app.listen(3000);
    console.log(`Server listening on http://localhost:3000`.green);
  } catch (error) {
    console.error('Error starting server:'.red, error);
  }
};

start();

export { wss };
