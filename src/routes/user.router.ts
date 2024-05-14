import { FastifyInstance } from 'fastify';
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';

const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.post('/users', createUser);
  fastify.get('/users/:id', getUser);
  fastify.put('/users/:id', updateUser);
  fastify.delete('/users/:id', deleteUser);
};

export default userRoutes;
