import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CampaignService } from './campaign.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import getFilePath from '../../../shared/getFilePath';

const createCampaignToDB = catchAsync(async (req: Request, res: Response) => {
  let image = getFilePath(req.files, 'images');
  const value = {
    image,
    ...req.body,
  };

  const result = await CampaignService.createCampaignToDB(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Campaign created successfully',
    data: result,
  });
});

export const CampaignController = {
  createCampaignToDB,
};
