import { User,Message } from '@/models';
import { wss } from 'server';


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
    return messageContent; // Continue to the next middleware or route
  } catch (error) {
    return -1; // Pass any errors to the error-handling middleware
  }
};

const createMessageAll = async (
  title: string,
  message: string,
  sender: string,
) => {
  try {
    const users = await User.find();
    // Access the WebSocket server from the request object
    // Create Message for each user and emit to WebSocket
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

    return messageContent; // Continue to the next middleware or route
  } catch (error) {
    return -1; // Pass any errors to the error-handling middleware
  }
};

export const messageService= { createMessage, createMessageAll}


