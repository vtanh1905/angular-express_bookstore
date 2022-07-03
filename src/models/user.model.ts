import mongoose from "mongoose";

export type User = {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { versionKey: false });

export const UserModel = mongoose.model<User>("User", userSchema);
