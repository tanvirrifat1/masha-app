import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CampaignValidationZodSchema } from './campaign.validation';
import { CampaignController } from './campaign.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-campaign',
  auth(USER_ROLES.BRAND),
  validateRequest(CampaignValidationZodSchema.campaignValidation),
  CampaignController.createCampaignToDB
);

export const CampaignRoutes = router;
