import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const { email, name, company, _id } = await User.create(payload);
  return { email, name, company, _id };
};

export const UserServices = {
  createUserIntoDB,
};
