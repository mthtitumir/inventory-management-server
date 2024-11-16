/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: { type: string, enum: ['admin', 'manager', 'moderator'], default: 'moderator' };
  companyId: Types.ObjectId;
  firstName: string;
  lastName: string;
  profilePicture?: string;
  company: Types.ObjectId;
  isDeleted: boolean;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(field: Record<string, unknown>): Promise<TUser & { _id: string }>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;