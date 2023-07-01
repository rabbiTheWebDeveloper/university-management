import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './academicSemester.controller';
import { UserValidation } from './academicSemester.validation';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRoutes = router;