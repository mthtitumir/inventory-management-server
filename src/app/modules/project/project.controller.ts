import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { ProjectServices } from './project.service';

const createProject = catchAsync(async (req, res) => {
  const result = await ProjectServices.createProjectIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project created successfully!',
    data: result,
  });
});

const updateProject = catchAsync(async (req, res) => {
  const id = req.params.projectId;
  const result = await ProjectServices.updateProjectIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Project updated successfully!',
    data: result,
  });
});

const getUserAllProject = catchAsync(async (req, res) => {
  const id = req?.user?._id; 
  // this id must be from the auth (auth.user)
  const result = await ProjectServices.getUserAllProjectFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User's projects retrieved successfully!",
    data: result,
  });
});

export const ProjectControllers = {
  createProject,
  updateProject,
  getUserAllProject
};
