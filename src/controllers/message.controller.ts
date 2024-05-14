import { messageService } from '../services/message.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { asyncUtil } from '@/util/async';
import { IMessage } from '@/types/interfaces';

export const sendMessage = asyncUtil(
  async (req: FastifyRequest, res: FastifyReply) => {
    const { title, message, sender, receiver } = req.body as IMessage;
    const response = await messageService.createMessage(
      title,
      message,
      sender,
      receiver,
    );
    if (response === -1) {
      res.status(500).send('Error creating message');
    } else {
      res.status(201).send(response);
    }
  },
);

export const BroadcastMessage = asyncUtil(
  async (req: FastifyRequest, res: FastifyReply) => {
    const { title, message, sender } = req.body as IMessage;
    const response = await messageService.createMessageAll(
      title,
      message,
      sender,
    );
    if (response === -1) {
      res.status(500).send('Error getting messages');
    } else {
      res.status(200).send(response);
    }
  },
);