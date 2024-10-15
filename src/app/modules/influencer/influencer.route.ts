import express from 'express';
import { InfluencerController } from './influencer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { InfluencerValiationZodSchema } from './influencer.validation';
import fileUploadHandler from '../../middlewares/fileUploadHandler';

const router = express.Router();

router.patch(
  '/:id',
  // validateRequest(InfluencerValiationZodSchema.InfluencerValiation),
  fileUploadHandler(),
  InfluencerController.updatedInfluencer
);

router.get('/', InfluencerController.getAllInfluencer);

export const InfluencerRoutes = router;
