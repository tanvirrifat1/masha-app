import Stripe from 'stripe';
import config from '../../../config';

import handleCheckoutSessionCompleted from '../../../util/subscribationHelpar/handleCheckoutSessionCompleted';
import handleInvoicePaymentSucceeded from '../../../util/subscribationHelpar/handleInvoicePaymentSucceeded';
import handleSubscriptionUpdated from '../../../util/subscribationHelpar/handleSubscriptionUpdated';

export const stripe = new Stripe(config.stripe_secret_key as string, {
  apiVersion: '2024-09-30.acacia',
});
const createCheckoutSession = async (plan: string) => {
  let priceId: string;
  console.log(plan);
  switch (plan) {
    case 'silver':
      priceId = 'price_1QCEkrLMVhw2FMhmSk9vFt8I';
      break;
    case 'gold':
      priceId = 'price_1QCEjiLMVhw2FMhmlNP5l4uU';
      break;
    case 'discount':
      priceId = 'price_1QCEloLMVhw2FMhmnDUnFb5C';
      break;
    default:
      throw new Error('Subscribe plan not found');
  }

  // golde=price_1QBC03LMVhw2FMhm8Cz0srZZ
  // silver=price_1QBBzCLMVhw2FMhmLXzkcML7
  // pro=price_1QBagbLMVhw2FMhmsaXzQPsn

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url:
      'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
    cancel_url: 'http://localhost:3000/cancel',
  });

  return session;
};

const retrieveSession = async (sessionId: string) => {
  return await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['subscription'],
  });
};

const createBillingPortal = async (customerId: string) => {
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `http://localhost:3000/`,
  });

  return portalSession;
};

const handleWebhook = async (event: any) => {
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutSessionCompleted(event.data.object);
      break;
    case 'invoice.payment_succeeded':
      await handleInvoicePaymentSucceeded(event.data.object);
      break;
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      await handleSubscriptionUpdated(event.data.object);
      break;
    default:
      console.log('Unhandled event type: ', event.type);
      break;
  }
};

// const handleWebhook = async (event: any) => {
//   console.log(event, 'eventssssssssss');
//   switch (event.type) {
//     case 'checkout.session.completed':
//       const paymentIntent = event.data;
//       console.log(paymentIntent);
//       break;
//     case 'invoice.payment_succeeded':
//       const invoice = event.data;
//       console.log(invoice);
//       break;
//     case 'invoice.payment_failed':
//       const paymentInvoice = event.data;
//       console.log(paymentInvoice);
//       break;
//     case 'customer.subscription.created':
//     case 'customer.subscription.updated':
//     case 'customer.subscription.deleted':
//       const subscription = event.data;
//       console.log(subscription);
//       break;
//     default:
//       console.log('Unhandled event type: ', event.type);
//       break;
//   }
// };

export const subscriptionService = {
  createCheckoutSession,
  retrieveSession,
  createBillingPortal,
  handleWebhook,
};
