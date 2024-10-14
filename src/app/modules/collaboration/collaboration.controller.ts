import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { CollaborationService } from './collaboration.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createCollaborationToDB = catchAsync(
  async (req: Request, res: Response) => {
    const payload = req.body;

    const result = await CollaborationService.createCollaborationToDB(payload);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Collaboration created successfully',
      data: result,
    });
  }
);

const getAllCollaborations = catchAsync(async (req: Request, res: Response) => {
  const result = await CollaborationService.getAllCollaborations(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Collaboration retirived successfully',
    data: result,
  });
});

export const CollaborationController = {
  createCollaborationToDB,
  getAllCollaborations,
};
