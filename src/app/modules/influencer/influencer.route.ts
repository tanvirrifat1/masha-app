import express from 'express';
import { InfluencerController } from './influencer.controller';

const router = express.Router();

router.patch('/:id', InfluencerController.updatedInfluencer);

export const InfluencerRoutes = router;
