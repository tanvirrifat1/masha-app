import { Subscribation } from '../../app/modules/subscribtion/subscribtion.model';

const handleCheckoutSessionCompleted = async (session: any) => {
  // Extract customer and subscription details from the session
  const customerId = session.customer;
  const subscriptionId = session.subscription;

  // You can also extract the plan from the session or fetch subscription details from Stripe
  const plan = session.plan || 'unknown';
  const status = 'active'; // Set the status to active upon successful checkout

  // Save subscription to the database
  await Subscribation.create({
    customerId,
    plan,
    subscriptionId,
    status,
  });

  console.log('Subscription created and saved to DB:', {
    customerId,
    plan,
    subscriptionId,
  });
};

export default handleCheckoutSessionCompleted;
