import express from 'express';
import { TaskControllers } from './task.controller';
import validateRequest from '../../middlewares/validateRequest';
import { TaskValidation } from './task.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

/*
1. create task by user, if team task then must assign someone
2. update task on status
3. get user specific all task (personal tasks and team tasks) with filter, sort, search
4. get all task of a project
*/

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(TaskValidation.createTaskSchema),
  TaskControllers.createTask,
);

router.patch(
  '/:taskId',
  auth(USER_ROLE.user),
  validateRequest(TaskValidation.updateTaskSchema),
  TaskControllers.updateTask,
);

router.get(
  '/',
  auth(USER_ROLE.user),
  TaskControllers.getUserSpecificTasks,
);

// didn't test this api yet 
router.get(
  '/:projectId',
  auth(USER_ROLE.user),
  TaskControllers.getProjectAllTasks
)

export const TaskRoutes = router;
