import { Request, Response } from 'express';
import subscriptionService from './subscribtion.service';

const subscriptionController = {
  subscribe: async (req: Request, res: Response) => {
    const plan = req.query.plan as string;

    if (!plan) {
      return res.status(400).send('Subscribe plan not found');
    }

    try {
      const sessionUrl = await subscriptionService.createCheckoutSession(plan);
      console.log(sessionUrl);
    } catch (error) {
      throw new Error(error as string);
    }
  },
  success: async (req: Request, res: Response) => {
    const session = await subscriptionService.retrieveSession(
      req.query.session_id as string
    );
    console.log(JSON.stringify(session));
    res.send('Subscribed successfully');
  },
  cancel: (req: Request, res: Response) => {
    res.redirect('/');
  },
  redirectToPortal: async (req: Request, res: Response) => {
    const portalUrl = await subscriptionService.createBillingPortalSession(
      req.params.id
    );
    res.redirect(portalUrl);
  },
  handleWebhook: async (req: Request, res: Response) => {
    const sig = req.headers['stripe-signature'] as string;

    let event;
    try {
      event = subscriptionService.constructEvent(req.body, sig);
    } catch (error) {
      throw new Error(error as string);
    }

    await subscriptionService.handleWebhook(event);
    res.sendStatus(200);
  },
};

export default subscriptionController;
