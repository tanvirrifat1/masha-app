import express from 'express';
import { InfluencerController } from './influencer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { InfluencerValiationZodSchema } from './influencer.validation';

const router = express.Router();

router.patch(
  '/:id',
  validateRequest(InfluencerValiationZodSchema.InfluencerValiation),
  InfluencerController.updatedInfluencer
);

router.get('/', InfluencerController.getAllInfluencer);

export const InfluencerRoutes = router;
