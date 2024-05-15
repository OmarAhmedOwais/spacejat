import { FastifyInstance } from 'fastify';
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
    url: '/users',
    handler: createUser
  });

  fastify.route({
    method: 'GET',
    url: '/users',
    handler: getUsers
  });

  fastify.route({
    method: 'GET',
    url: '/users/:id',
    handler: getUser
  });

  fastify.route({
    method: 'PUT',
    url: '/users/:id',
    handler: updateUser
  });

  fastify.route({
    method: 'DELETE',
    url: '/users/:id',
    handler: deleteUser
  });
};

export default userRoutes;