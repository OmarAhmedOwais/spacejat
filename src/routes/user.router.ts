import { FastifyInstance } from 'fastify';

import {
  createUserSchema,
  updateUserSchema,
} from '../schemas/user/user.schema';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: 'POST',
    url: '/',
    schema: createUserSchema,
    handler: createUser,
  });

  fastify.route({
    method: 'GET',
    url: '/',
    schema: { tags: ['Users'] },
    handler: getUsers,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: { tags: ['Users'] },
    handler: getUser,
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    schema: updateUserSchema,
    handler: updateUser,
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    schema: { tags: ['Users'] },
    handler: deleteUser,
  });
};

export { userRoutes };
