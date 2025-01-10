import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { DeliveryCofirmationService } from './deliveryCofirmation.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import getFilePath from '../../../shared/getFilePath';
import { delCache, getCache, setCache } from '../../../shared/redisCash';

const createDeliveryCofirmation = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.user.id;
    let image = getFilePath(req.files, 'images');

    const value = {
      ...req.body,
      userId: userId,
      image,
    };

    const cacheKeyPattern = `deliveryHistory:${userId}`;
    await delCache(cacheKeyPattern);

    const result = await DeliveryCofirmationService.createOrderConfirmed(value);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Delivery cofirmation created successfully',
      data: result,
    });
  }
);

// const getDeliveryHistory = catchAsync(async (req: Request, res: Response) => {
//   const userId = req.user.id;

//   const value = {
//     ...req.body,
//     userId: userId,
//   };

//   const result = await DeliveryCofirmationService.getDeliveryHistory(value);
//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: 'Delivery history retrived successfully',
//     data: result,
//   });
// });

const getDeliveryHistory = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user.id;

  // Generate a user-specific cache key
  const cacheKey = `deliveryHistory:${userId}:${JSON.stringify(req.query)}`;

  // Check if the data is already cached
  const cachedData = await getCache(cacheKey);

  if (cachedData) {
    return sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Delivery history retrieved successfully.',
      data: cachedData,
    });
  }

  // Fetch the delivery history from the service
  const result = await DeliveryCofirmationService.getDeliveryHistory({
    ...req.body,
    userId,
  });

  // Cache the result with a TTL (e.g., 10 minutes)
  await setCache(cacheKey, result, 300);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Delivery history retrieved successfully.',
    data: result,
  });
});

export const DeliveryCofirmationController = {
  createDeliveryCofirmation,
  getDeliveryHistory,
};
