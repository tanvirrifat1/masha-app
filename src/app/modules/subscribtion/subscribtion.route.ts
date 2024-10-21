import { Router } from 'express';

import express from 'express';
import { SubscriptionController } from './subscribtion.controller';

const router = Router();

router.post(
  '/allHooks',
  express.raw({ type: 'application/json' }),
  SubscriptionController.webhookHandler
);

router.get('/subscribe', SubscriptionController.createSession);
router.get('/success', SubscriptionController.Success);
router.get('/customers/:id', SubscriptionController.customerPortal);

export const SubscriptionRoutes = router;
