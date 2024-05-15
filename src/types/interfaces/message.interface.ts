export interface IMessage {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  sender: string;
  receiver: string;
  createdAt: Date;
  updatedAt: Date;
}
