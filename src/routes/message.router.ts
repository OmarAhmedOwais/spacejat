import { FastifyInstance } from 'fastify';

import { BroadcastMessage, sendMessage, getMessages } from '@/controllers';

const messageRouter = async (fastify: FastifyInstance): Promise<void> => {
  // fastify.route({
  //   method: 'POST',
  //   url: '/sendMessage',
  //   handler: sendMessage,
  // });

  fastify.route({
    method: 'POST',
    url: '/broadcastMessage',
    schema: {
      body: {
        type: 'object',
        required: ['sender', 'title', 'message'],
        properties: {
          sender: { type: 'string' },
          title: { type: 'string' },
          message: { type: 'string' },
        },
      },
    },
    handler: BroadcastMessage,
  });

  fastify.route({
    method: 'GET',
    url: '/getMessages/:receiver',
    handler: getMessages,
  });
};

export { messageRouter };
