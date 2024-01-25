import { Types } from 'mongoose';

export type TProject = {
  name: string;
  description?: string;
  admin: Types.ObjectId;
  startDate?: Date;
  endDate?: Date;
};
