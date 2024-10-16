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

// const createCampaignToDB = catchAsync(async (req: Request, res: Response) => {
//   // Ensure that req.body.data is parsed correctly
//   const campaignData =
//     typeof req.body.data === 'string'
//       ? JSON.parse(req.body.data)
//       : req.body.data;
//   console.log(campaignData);
//   // Get image file paths
//   const image = getFilePath(req.files, 'images');

//   // Create the value object with parsed data and image
//   const value = {
//     image,
//     ...campaignData,
//   };

//   // Call the service to create the campaign in the database
//   const result = await CampaignService.createCampaignToDB(value);

//   // Send the response
//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: 'Campaign created successfully',
//     data: result,
//   });
// });

const getAllCampaigns = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignService.getAllCampaigns(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Campaign retrived successfully',
    data: result,
  });
});

const getSingleCmpaign = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignService.getSingleCmpaign(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single Campaign retrived successfully',
    data: result,
  });
});

const updateCampaignToDB = catchAsync(async (req: Request, res: Response) => {
  let image = getFilePath(req.files, 'images');
  const value = {
    image,
    ...req.body,
  };

  const result = await CampaignService.updateCampaignToDB(req.params.id, value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Campaign updated successfully',
    data: result,
  });
});

const deletedCampaignToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await CampaignService.deletedCampaignToDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Campaign deleted successfully',
    data: result,
  });
});

const updatedCampaignStatusToDB = catchAsync(
  async (req: Request, res: Response) => {
    const result = await CampaignService.updatedCampaignStatusToDB(
      req.params.id,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Campaign status updated successfully',
      data: result,
    });
  }
);

export const CampaignController = {
  createCampaignToDB,
  getAllCampaigns,
  getSingleCmpaign,
  updateCampaignToDB,
  deletedCampaignToDB,
  updatedCampaignStatusToDB,
};
