import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { BrandService } from './brand.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const updatedBrand = catchAsync(async (req: Request, res: Response) => {
  const brandId = req.params.id;
  const brandData = req.body;
  const result = await BrandService.updateBrandToDB(brandId, brandData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Brand updated successfully',
    data: result,
  });
});

export const BrandController = {
  updatedBrand,
};
