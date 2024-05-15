import mongoose, { Schema, Types } from 'mongoose';

import { IMessage } from '@/types/interfaces';
import { Models } from '@/types/enums';

const messageSchema = new Schema<IMessage>({
  title: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message = mongoose.model<IMessage>(
  Models.Message,
  messageSchema,
  Models.Message,
);
