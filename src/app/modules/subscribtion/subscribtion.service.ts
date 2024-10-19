import Stripe from 'stripe';
import config from '../../../config';

export const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2024-09-30.acacia',
});
const subscriptionService = {
  createCheckoutSession: async (plan: string) => {
    let priceId: string;

    switch (plan.toLowerCase()) {
      case 'silver':
        priceId = 'price_1QBBzCLMVhw2FMhmLXzkcML7';
        break;
      case 'gold':
        priceId = 'price_1QBC03LMVhw2FMhm8Cz0srZZ';
        break;
      case 'pro':
        priceId = 'price_1QBagbLMVhw2FMhmsaXzQPsn';
        break;
      default:
        throw new Error('Subscribe plan not found');
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/cancel`,
    });

    return session.url;
  },

  retrieveSession: async (sessionId: string) => {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription'],
    });
  },

  createBillingPortalSession: async (customerId: string) => {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `http://localhost:3000/`,
    });
    return portalSession.url;
  },

  handleWebhook: async (event: any) => {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log(event.data);
        break;
      case 'invoice.payment_succeeded':
        console.log(event.data);
        break;
      case 'invoice.payment_failed':
        console.log(event.data);
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted':
        console.log(event.data);
        break;
      default:
        console.log('Unhandled event type: ', event.type);
        break;
    }
  },

  constructEvent: (payload: any, sig: string) => {
    return stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  },
};

export default subscriptionService;
