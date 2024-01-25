import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { TaskServices } from './task.service';

const createTask = catchAsync(async (req, res) => {
  const result = await TaskServices.createTaskIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task created successfully!',
    data: result,
  });
});

const updateTask = catchAsync(async (req, res) => {
  const id = req.params.taskId;
  const result = await TaskServices.updateTaskIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Task updated successfully!',
    data: result,
  });
});

const getUserSpecificTasks = catchAsync(async (req, res) => {
  const result = await TaskServices.getUserSpecificTasksFromDB(
    req?.user,
    req?.query,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User's all tasks retrieved successfully!`,
    data: result,
  });
});

const getProjectAllTasks = catchAsync(async (req, res) => {
  const id = req?.params?.projectId;
  const result = await TaskServices.getProjectAllTasksFromDB(
    id,
    req?.user,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Project's all tasks retrieved successfully!`,
    data: result,
  });
});

export const TaskControllers = {
  createTask,
  updateTask,
  getUserSpecificTasks,
  getProjectAllTasks,
};
