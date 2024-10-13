import express from 'express';
import { BrandController } from './brand.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BrandValiationZodSchema } from './brand.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(BrandValiationZodSchema.BrandValiation),
  BrandController.updatedBrand
);

export const BrandRoutes = router;
