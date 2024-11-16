import { JwtPayload } from 'jsonwebtoken';
import { TUser } from './user.interface';
import { User } from './user.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createUserIntoDB = async (user: (JwtPayload & { role: string; }) | undefined, payload: Partial<TUser>) => {
  const userData = { companyId: user?.companyId, ...payload };
  const { firstName, lastName, email, role, company } = await User.create(userData);
  return { firstName, lastName, email, role, company };
};

const getAllUserFromDB = async (user: (JwtPayload & { role: string; }) | undefined, query: Record<string, unknown>) => {
  const result = await User.find({ companyId: user?.companyId, ...query }).select("firstName lastName username email role");
  return result;
};

const getMeFromDB = async (id: string) => {
  const result = await User.findById(id).select("firstName lastName username email role");
  return result;
};

const updateUserInDB = async (user: (JwtPayload & { role: string; }) | undefined, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate({ companyId: user?.companyId, _id: user?._id }, { ...payload }, { new: true }).select("firstName lastName username email role companyId");
  return result;
};

const updateUserAccessInDB = async (user: (JwtPayload & { role: string; }) | undefined, id: string, payload: Partial<TUser>) => {
  const member = await User.findById(id);
  if (!member) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  if (member?.companyId != user?.companyId) {
    throw new AppError(httpStatus.NOT_FOUND, "This user doesn't belong to this company !");
  }
  const result = await User.findOneAndUpdate({ companyId: user?.companyId, _id: id }, { ...payload }, { new: true }).select("firstName lastName username email role isDeleted isBlocked companyId");
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
  updateUserAccessInDB,
  deleteUserFromDB
};
