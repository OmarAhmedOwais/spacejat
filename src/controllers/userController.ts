import userService from '../services/userService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { asyncUtil } from '@/util/async';
import { IUser, IParams } from '@/types/interfaces';

const createUser = asyncUtil(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const user = await userService.createUser(req.body as IUser);
    return reply.send(user);
  },
);

const getUser = asyncUtil(async (req: FastifyRequest, reply: FastifyReply) => {
  const { id } = req.params as IParams;
  const user = await userService.getUser(id);
  if (!user) return reply.status(404).send({ error: 'User not found' });
  return reply.send(user);
});

const updateUser = asyncUtil(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as IParams;
    const userData = req.body;
    const updatedUser = await userService.updateUser(
      id as string,
      userData as IUser,
    );
    if (!updatedUser)
      return reply.status(404).send({ error: 'User not found' });
    return reply.send(updatedUser);
  },
);

const deleteUser = asyncUtil(
  async (req: FastifyRequest, reply: FastifyReply) => {
    const { id } = req.params as IParams;
    const deletedUser = await userService.deleteUser(id);
    if (!deletedUser)
      return reply.status(404).send({ error: 'User not found' });
    return reply.send({ message: 'User deleted successfully' });
  },
);

export { createUser, getUser, updateUser, deleteUser };
