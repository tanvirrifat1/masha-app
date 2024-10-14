import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CollaborationController } from './collaboration.controller';

const router = express.Router();

router.post(
  '/create-collaboration',
  CollaborationController.createCollaborationToDB
);

router.get('/', CollaborationController.getAllCollaborations);

export const CollaborationRoutes = router;