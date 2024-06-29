import 'colors';
import { Server as s, IncomingMessage, ServerResponse } from 'http';

import dotenv from 'dotenv';
import fastify, { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swagger_ui from '@fastify/swagger-ui';
import { Server } from 'ws';
import db_connection from 'config/db_connection';
import { initSocket } from 'config/ws_connection';

import { userRoutes, messageRouter } from './src/routes';
import swaggerDefinitions from './src/schemas';

import { globalErrorMiddleware } from '@/middlewares';

dotenv.config({ path: 'config/config.env' });

const app: FastifyInstance<s, IncomingMessage, ServerResponse> = fastify();

app.register(swagger, {
  prefix: '/documentation',
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
    basePath: '/',
    schemes: ['http', 'https'],
  },
  definitions: {
    User: swaggerDefinitions.User, // Group for User definitions
    Message: swaggerDefinitions.Message, // Group for Message definitions
  },
});

app.register(swagger_ui, {
  prefix: '/documentation',
});

// Register routes with prefixes
app.register(userRoutes, {
  prefix: '/api/users',
  swagger: { tags: ['Users'] },
});
app.register(messageRouter, {
  prefix: '/api/messages',
  swagger: { tags: ['Users'] },
});

// Register global error middleware
globalErrorMiddleware(app);

let wss: Server; // define wss outside the function
export const start = async (): Promise<void> => {
  try {
    db_connection(); // connect to MongoDB

    wss = initSocket(3001);
    await app.listen({ port: 3000 });
    console.log(`Server listening at http://localhost:3000`);
    console.log(`WebSocket server listening on http://localhost:3001`.green);
  } catch (error) {
    console.error('Error starting server:'.red, error);
    process.exit(1);
  }
};

start();

export { wss };
