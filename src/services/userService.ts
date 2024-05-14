import { IUser } from '@/types/interfaces';
import { User} from '../models/userModel';


const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};

const getUser = async (userId: string) => {
  return await User.findById(userId);
};

const updateUser = async (userId: string, userData: IUser) => {
  return await User.findByIdAndUpdate(userId, userData, { new: true });
};

const deleteUser = async (userId: string) => {
  return await User.findByIdAndDelete(userId);
};

export default { createUser, getUser, updateUser, deleteUser };
