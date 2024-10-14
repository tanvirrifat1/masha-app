import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { DiscountClubValidation } from './discountClub.validation';
import { DiscountClubController } from './discountClub.controller';

const router = express.Router();

router.post(
  '/create-discount',
  auth(USER_ROLES.BRAND),
  validateRequest(DiscountClubValidation.createDiscountClubValidation),
  DiscountClubController.createDiscountClubToDB
);

router.get(
  '/',
  auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  DiscountClubController.getAllDiscount
);

router.get(
  '/:id',
  auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  DiscountClubController.getSingleDiscount
);

router.patch(
  '/:id',
  auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  validateRequest(DiscountClubValidation.updatedDiscountClubValidation),
  DiscountClubController.updateCampaignToDB
);

router.delete(
  '/:id',
  auth(USER_ROLES.BRAND, USER_ROLES.ADMIN),
  DiscountClubController.deletedCampaignToDB
);

export const DiscountClubRoutes = router;
