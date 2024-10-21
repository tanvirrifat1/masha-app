import { Request, Response } from 'express';
import { subscriptionService } from './subscribtion.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createSession = catchAsync(async (req: Request, res: Response) => {
  const { plan } = req.query; // Destructure plan from req.body

  if (!plan) {
    return res.status(400).send('Plan is required');
  }

  const result = await subscriptionService.createCheckoutSession(
    plan.toLowerCase() // Now this will work as plan is a string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscription created successfully',
    data: result,
  });
});

const Success = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionService.retrieveSession(
    req.params.id as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Subscription successful',
    data: result,
  });
});

const customerPortal = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionService.createBillingPortal(
    req.params.id as string
  );

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'createBillingPortal successful',
    data: result,
  });
});

const webhookHandler = catchAsync(async (req: Request, res: Response) => {
  const result = await subscriptionService.handleWebhook(req.body);
  console.log({ result });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'webhookHandler successful',
    data: result,
  });
});

export const SubscriptionController = {
  createSession,
  Success,
  customerPortal,
  webhookHandler,
};
