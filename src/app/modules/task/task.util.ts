import { Task } from './task.model';

export const findLastTaskId = async () => {
  const lastStudent = await Task.findOne({})
    .sort({ createdAt: -1 })
    .select('taskId')
    .lean();

  return lastStudent?.taskId ? lastStudent.taskId.toString() : undefined;
};
