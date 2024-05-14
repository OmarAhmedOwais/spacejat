import fastify, { FastifyInstance } from 'fastify';
import swagger from 'fastify-swagger';
import { Server, IncomingMessage, ServerResponse } from 'http';
import userRoutes from './src/routes/userRoutes';
import { initSocket } from 'config/io_connection';
import db_connection from 'config/db_connection'; // import the db_connection function

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

let wss; // define wss outside the function

const start = async (): Promise<void> => {
    try {
        db_connection(); // connect to MongoDB

        wss = initSocket(app.server);

        wss.on('connection', (ws) => {
            console.log('WebSocket client connected');
            
            ws.on('message', (message) => {
                console.log('Received message:', message);
                // Handle message and send response back to client
                ws.send('Message received by server');
            });
        });

        await app.listen(3000);
        console.log(`Server listening on http://localhost:3000`);
    } catch (error) {
        console.error('Error starting server:', error);
    }
};

start();

export { wss }; // export wss