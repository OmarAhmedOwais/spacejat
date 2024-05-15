import { FastifyInstance } from 'fastify';

import { BroadcastMessage, sendMessage, getMessages } from '@/controllers';

const messageRouter = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: 'POST',
    url: '/sendMessage',
    handler: sendMessage,
  });

  fastify.route({
    method: 'POST',
    url: '/broadcastMessage',
    handler: BroadcastMessage,
  });

  fastify.route({
    method: 'GET',
    url: '/getMessages',
    handler: getMessages,
  });
};

export { messageRouter };
