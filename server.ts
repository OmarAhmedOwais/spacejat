import 'colors';
import { Server as s, IncomingMessage, ServerResponse } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

import dotenv from 'dotenv';
import fastify, { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swagger_ui from '@fastify/swagger-ui';

import { Server } from 'ws';
import db_connection from 'config/db_connection';
import { initSocket } from 'config/ws_connection';

import { userRoutes, messageRouter } from './src/routes';

import { globalErrorMiddleware } from '@/middlewares';
import { Message } from '@/models';

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
    // host: '127.0.0.1:3000',
    basePath: '/',
    schemes: ['http', 'https'],
    definitions: {
      User: {
        type: 'object',
        required: ['id', 'email'],
        properties: {
          _id: {
            type: 'number',
            format: 'uuid',
          },
          name: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          age: {
            type: 'number',
          },
        },
      },
      Message: {
        type: 'object',
        required: ['message', 'title', 'sender', 'receiver'],
        properties: {
          _id: {
            type: 'number',
            format: 'uuid',
          },
          message: {
            type: 'string',
          },
          title: {
            type: 'string',
          },
          sender: {
            type: 'string',
          },
          receiver: {
            type: 'string',
          },
        },
      },
      paths: {
        '/api/messages/broadcastMessage': {
          post: {
            summary: 'broadcast a new message',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/definitions/Message',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
});
app.register(swagger_ui, {
  prefix: '/documentation',
});
app.register(userRoutes, { prefix: '/api/users' });
app.register(messageRouter, { prefix: '/api/messages' });
globalErrorMiddleware(app);

let wss: Server; // define wss outside the function
export const start = async (): Promise<void> => {
  try {
    db_connection(); // connect to MongoDB

    wss = initSocket(3001);
    await app.listen(3000, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      console.log(`Server listening at ${address}`);
    });
    console.log(`Server listening on http://localhost:3001`.green);
  } catch (error) {
    console.error('Error starting server:'.red, error);
  }
};

start();

export { wss };
