import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';

import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import getFilePath from '../../../shared/getFilePath';
import { DiscountClubService } from './discountClub.service';

const createDiscountClubToDB = catchAsync(
  async (req: Request, res: Response) => {
    let image =
      getFilePath(req.files, 'images') ||
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'; // Default image
    const value = {
      image,
      ...req.body,
    };

    const result = await DiscountClubService.createDiscountToDB(value);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Discount-Club created successfully',
      data: result,
    });
  }
);

const getAllDiscount = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountClubService.getAllDiscount(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Discount-Club retrived successfully',
    data: result,
  });
});

const getSingleDiscount = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountClubService.getSingleDiscount(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single Discount-Club retrived successfully',
    data: result,
  });
});

const updateCampaignToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountClubService.updateDiscountToDB(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Discount-Club updated successfully',
    data: result,
  });
});

const deletedCampaignToDB = catchAsync(async (req: Request, res: Response) => {
  const result = await DiscountClubService.deletedDiscountToDB(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Discount-Club deleted successfully',
    data: result,
  });
});

export const DiscountClubController = {
  createDiscountClubToDB,
  getAllDiscount,
  getSingleDiscount,
  updateCampaignToDB,
  deletedCampaignToDB,
};
