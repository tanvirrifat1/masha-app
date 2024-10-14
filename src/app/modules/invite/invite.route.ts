import express from 'express';
import { InviteController } from './invite.controller';
import validateRequest from '../../middlewares/validateRequest';
import { InviteValiationZodSchema } from './invite.validation';

const router = express.Router();

router.post(
  '/create-invite',
  validateRequest(InviteValiationZodSchema.createInviteValiation),
  InviteController.createCategoryToDB
);

router.get('/', InviteController.getAllInvites);

export const InviteRoutes = router;
