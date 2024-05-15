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
    url: '/',
    handler: createUser
  });

  fastify.route({
    method: 'GET',
    url: '/',
    handler: getUsers
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    handler: getUser
  });

  fastify.route({
    method: 'PUT',
    url: '/:id',
    handler: updateUser
  });

  fastify.route({
    method: 'DELETE',
    url: '/:id',
    handler: deleteUser
  });
};

export {userRoutes};