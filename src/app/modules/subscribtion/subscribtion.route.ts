import { Router } from 'express';

import express from 'express';
import subscriptionController from './subscribtion.controller';

const router = Router();

router.get('/', (req, res) => res.render('index'));
router.get('/subscribe', subscriptionController.subscribe);
router.get('/success', subscriptionController.success);
router.get('/cancel', subscriptionController.cancel);
router.get('/customers/:id', subscriptionController.redirectToPortal);
router.post(
  '/hook',
  express.raw({ type: 'application/json' }),
  subscriptionController.handleWebhook
);

export const SubscriptionRoutes = router;
