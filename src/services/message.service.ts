import { wss } from 'server';

import { User, Message } from '@/models';

const createMessage = async (
  title: string,
  message: string,
  sender: string,
  receiver: string,
) => {
  try {
    let messageContent = {};
    const receivers = receiver.split(',');
    for (const receiver of receivers) {
      messageContent = await Message.create({
        title,
        message: messageContent,
        sender,
        receiver: receiver.toString(),
      });
      wss.emit(receiver.toString(), messageContent);
    }
    messageContent = {
      title,
      message: messageContent,
      sender,
      receiver,
    };
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
        message: messageContent,
        sender,
        receiver: user._id.toString(),
      });
      wss.emit(user._id.toString(), messageContent);
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
