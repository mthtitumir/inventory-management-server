import { Types } from 'mongoose';
import { TUser } from '../user/user.interface';
import { User } from '../user/user.model';
import { taskSearchableFields } from './task.constant';
import { TTask } from './task.interface';
import { Task } from './task.model';
import { findLastTaskId } from './task.util';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createTaskIntoDB = async (payload: TTask) => {
  const lastTaskId = await findLastTaskId();
  if (lastTaskId) {
    payload.taskId = (Number(lastTaskId) + 1).toString();
  } else {
    payload.taskId = '1001';
  }
  const result = await Task.create(payload);
  return result;
};

const updateTaskIntoDB = async (id: string, payload: Partial<TTask>) => {
  const result = await Task.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getUserSpecificTasksFromDB = async (
  user: Record<string, unknown>,
  query: Record<string, unknown>,
) => {
  // search by title/description || sort by dueDate || filter by status/priority
  const {
    searchTerm = '',
    page = 1,
    limit = 10,
    sortBy = 'dueDate',
    sortOrder = 'asc',
    status,
    priority,
  } = query;
  const filter: Record<string, unknown> = { assignee: user?._id };
  // console.log(user);

  const skip = (Number(page) - 1) * Number(limit);
  if (status) {
    filter.status = status;
  }
  if (priority) {
    filter.priority = priority;
  }
  // WE ARE DYNAMICALLY DOING IT USING LOOP
  const searchQuery = Task.find({
    $or: taskSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  const result: TTask[] = await searchQuery
    .find(filter)
    .sort({ [sortBy as string]: sortOrder === 'asc' ? 1 : -1 })
    .skip(skip)
    .limit(parseInt(limit as string));
  return result;
};

const getProjectAllTasksFromDB = async (
  id: Types.ObjectId,
  user: Record<string, unknown>,
) => {
  // check if the user is eligible to see the project's tasks // user model has a field named projects, check if the id contains there or not;
  const userData: TUser | null = await User.findById(user?._id);
  if (userData?.projects?.includes(id)) {
    // console.log('hello');
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not eligible to see this data!")    
  }
  const result = await Task.find({ project: id });
  return result;
};

export const TaskServices = {
  createTaskIntoDB,
  updateTaskIntoDB,
  getUserSpecificTasksFromDB,
  getProjectAllTasksFromDB,
};
