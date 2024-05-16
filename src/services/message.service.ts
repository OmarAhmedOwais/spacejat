import { wss } from 'server';
import { WebSocket } from 'ws';
import { User, Message } from '@/models';

const createMessage = async (
  title: string,
  message: string,
  sender: string,
  receiver: string,
) => {
  try {
    const messageContent = await Message.create({
      title,
      message: message,
      sender,
      receiver: receiver.toString(),
    });
    console.log('messageContent', messageContent);
    // Check if a client is connected with the receiver ID

    wss.clients.forEach((client) => {
      client.send(JSON.stringify(messageContent));
    });

    return messageContent;
  } catch (error) {
    return -1;
  }
};

const createMessageAll = async (
  title: string,
  message: string,
  sender: string,
) => {
  try {
    const users = await User.find();
    let messageContent = {};
    for (const user of users) {
      messageContent = await Message.create({
        title,
        message,
        sender,
        receiver: user._id.toString(),
      });

      // Send the message to all connected clients
      wss.clients.forEach((client) => {
        client.send(JSON.stringify(messageContent));
      });
    }

    messageContent = {
      title,
      message: messageContent,
      sender,
      reciever: 'all',
    };

    return messageContent;
  } catch (error) {
    return -1;
  }
};
const getMessages = async (receiver: string) => {
  try {
    const messages = await Message.find({ receiver });
    return messages;
  } catch (error) {
    return -1;
  }
};

export const messageService = { createMessage, createMessageAll, getMessages };
