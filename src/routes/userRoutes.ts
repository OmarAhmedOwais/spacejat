import { FastifyInstance } from 'fastify';
import { createUserHandler, getUserHandler, updateUserHandler, deleteUserHandler } from '../controllers/userController';

const userRoutes = async (fastify: FastifyInstance): Promise<void> => {
    fastify.post('/users', createUserHandler);
    fastify.get('/users/:id', getUserHandler);
    fastify.put('/users/:id', updateUserHandler);
    fastify.delete('/users/:id', deleteUserHandler);
};

export default userRoutes;
