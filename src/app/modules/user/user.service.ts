import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const { email, name, company, _id } = await User.create(payload);
  return { email, name, company, _id };
};

const getAllUserFromDB = async (user: (JwtPayload & { role: string; }) | undefined, query: Record<string, unknown>) => {
  const result = await User.find({ company: user?.company, ...query }).select("name email role");
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB
};
