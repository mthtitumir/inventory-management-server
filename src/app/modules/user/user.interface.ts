/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  email: string;
  role: "superAdmin" | "admin" | "manager" | "seller";
  password: string;
  name: string;
  profilePicture?: string;
  company: Types.ObjectId;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(field: Record<string, unknown>): Promise<TUser & {_id: string}>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;