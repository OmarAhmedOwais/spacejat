import mongoose from "mongoose";
import { IUser } from "../types/interfaces/user.interface";
import { Models } from "@/types/enums/model";


const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
});

export const User = mongoose.model(Models.User, userSchema,Models.User);
