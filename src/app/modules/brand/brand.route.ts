import express, { NextFunction, Request, Response } from 'express';
import { BrandController } from './brand.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BrandValiationZodSchema } from './brand.validation';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.get('/', BrandController.getAllBrands);

router.patch(
  '/:id',
  // validateRequest(BrandValiationZodSchema.BrandValiation),
  fileUploadHandler(),

  (req: Request, res: Response, next: NextFunction) => {
    req.body = BrandValiationZodSchema.BrandValiation.parse(
      JSON.parse(req.body.data)
    );
    return BrandController.updatedBrand(req, res, next);
  }
);

export const BrandRoutes = router;
