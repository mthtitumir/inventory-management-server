import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (user: (JwtPayload & { role: string; }) | undefined, payload: Partial<TUser>) => {
  const userData = { company: user?.company, ...payload };
  const { name, email, role, company } = await User.create(userData);
  return { name, email, role, company };
};

const getAllUserFromDB = async (user: (JwtPayload & { role: string; }) | undefined, query: Record<string, unknown>) => {
  const result = await User.find({ company: user?.company, ...query }).select("name email role");
  return result;
};

const getMeFromDB = async (id: string) => {
  const result = await User.findById(id).select("name email role");
  return result;
};

const updateUserInDB = async (user: (JwtPayload & { role: string; }) | undefined, id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ company: user?.company, _id: id }, { ...payload }, { new: true }).select(" name email role company");
  return result;
};

const deleteUserFromDB = async (user: (JwtPayload & { role: string; }) | undefined, id: string) => {
  const result = await User.deleteOne({ company: user?.company, _id: id });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getMeFromDB,
  updateUserInDB,
  deleteUserFromDB
};
