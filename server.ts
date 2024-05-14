import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { createUserHandler, getUserHandler, updateUserHandler, deleteUserHandler } from './controllers/userController';
import userRoutes from './routes/userRoutes';
import { Server as WebSocketServer } from 'ws';

const app: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

app.register(swagger, {
    routePrefix: '/documentation',
    swagger: {
        info: {
            title: 'Fastify API',
            description: 'Documentation for Fastify API',
            version: '1.0.0'
        },
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        consumes: ['application/json'],
        produces: ['application/json']
    },
    exposeRoute: true
});

app.register(userRoutes, { prefix: '/api' });

const start = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb://localhost:27017/fastify-demo', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Connected to MongoDB');

        const server = createServer(app.server);

        const wss = new WebSocketServer({ server });

        wss.on('connection', (ws) => {
            console.log('WebSocket client connected');
            
            ws.on('message', (message) => {
                console.log('Received message:', message);
                // Handle message and send response back to client
                ws.send('Message received by server');
            });
        });

        server.listen(3000);
        app.swagger();
        console.log(`Server listening on http://localhost:3000`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

start();
