import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CampaignValidationZodSchema } from './campaign.validation';
import { CampaignController } from './campaign.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.post(
  '/create-campaign',
  // auth(USER_ROLES.BRAND),
  fileUploadHandler(),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = CampaignValidationZodSchema.campaignValidation.parse(
      JSON.parse(req.body.data)
    );
    return CampaignController.createCampaignToDB(req, res, next);
  }
  // validateRequest(CampaignValidationZodSchema.campaignValidation),
  // CampaignController.createCampaignToDB
);

router.get(
  '/',
  // auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  CampaignController.getAllCampaigns
);

router.get(
  '/:id',
  // auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  CampaignController.getSingleCmpaign
);

router.patch(
  '/:id',
  // auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  CampaignController.updatedCampaignStatusToDB
);

router.patch(
  '/:id',
  // auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  // validateRequest(CampaignValidationZodSchema.campaignUpdatedValidation),
  CampaignController.updateCampaignToDB
);

router.delete(
  '/:id',
  // auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  CampaignController.deletedCampaignToDB
);

export const CampaignRoutes = router;
