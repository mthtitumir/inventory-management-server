import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const { email, name, _id } = await User.create(payload);
  return { email, name, _id };
};

export const UserServices = {
  createUserIntoDB,
};
