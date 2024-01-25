/* eslint-disable no-unused-vars */
import { Model } from "mongoose";

export type TUser = {
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
};


export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExists(field: Record<string, unknown>): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}