import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { InfluencerService } from './influencer.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const updatedInfluencer = catchAsync(async (req: Request, res: Response) => {
  const influencerId = req.params.id;
  const influencerData = req.body;
  const result = await InfluencerService.updateInfluencerToDB(
    influencerId,
    influencerData
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Influencer updated successfully',
    data: result,
  });
});

export const InfluencerController = {
  updatedInfluencer,
};
