import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderReqService } from './orderReq.service';
import { Request, Response } from 'express';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  const value = {
    ...req.body,
    userId: userId,
  };

  const result = await OrderReqService.createOrder(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
  const { longitude, latitude, maxDistanceInMeters } = req.query;

  console.log(latitude, longitude, maxDistanceInMeters);

  const result = await OrderReqService.findUsersNearLocation(
    longitude as unknown as number,
    latitude as unknown as number,
    maxDistanceInMeters as unknown as number
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Order retrived successfully',
    data: result,
  });
});

export const OrderReqController = {
  createOrder,
  getAllOrder,
};
