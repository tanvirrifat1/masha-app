import express from 'express';
import { BrandController } from './brand.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BrandValiationZodSchema } from './brand.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.patch(
  '/:id',
  // validateRequest(BrandValiationZodSchema.BrandValiation),
  fileUploadHandler(),
  BrandController.updatedBrand
);

router.get('/', BrandController.getAllBrands);

export const BrandRoutes = router;
