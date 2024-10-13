import express from 'express';
import { BrandController } from './brand.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BrandValiationZodSchema } from './brand.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(BrandValiationZodSchema.BrandValiation),
  BrandController.updatedBrand
);

router.get('/', auth(USER_ROLES.BRAND), BrandController.getAllBrands);

export const BrandRoutes = router;
