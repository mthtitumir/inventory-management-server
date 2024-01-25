import express from 'express';
import { ProjectControllers } from './project.controller';
import validateRequest from '../../middlewares/validateRequest';
import { ProjectValidation } from './project.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

/*
1. create a project
2. update project
3. get user all project
*/

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(ProjectValidation.createProjectValidationSchema),
  ProjectControllers.createProject,
);

router.patch(
  '/:projectId',
  auth(USER_ROLE.user),
  validateRequest(ProjectValidation.updateProjectValidationSchema),
  ProjectControllers.updateProject,
);

router.get(
  '/',
  auth(USER_ROLE.user),
  ProjectControllers.getUserAllProject,
);

export const ProjectRoutes = router;
