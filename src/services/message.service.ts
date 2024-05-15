import { wss } from 'server';

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
   console.log("messageContent",messageContent);
   

    wss.emit(messageContent.receiver.toString(), messageContent);

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
