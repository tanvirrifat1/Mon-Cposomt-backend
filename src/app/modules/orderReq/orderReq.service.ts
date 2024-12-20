import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IOrderReq } from './orderReq.interface';
import { Order } from './orderReq.model';
import { User } from '../user/user.model';

const createOrder = async (payload: IOrderReq) => {
  const requiredFields: (keyof IOrderReq)[] = [
    'userId',
    'orderDetails',
    'location',
    'quantity',
    'type',
  ];
  const missingFields = requiredFields.filter(field => !payload[field]);

  if (missingFields.length > 0) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Missing required fields: ${missingFields.join(', ')}`
    );
  }

  const isUserExist = await User.findOne({ _id: payload.userId });

  if (!isUserExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'User not found');
  }

  const order = await Order.create(payload);
  return order;
};

const findUsersNearLocation = async (
  longitude: number,
  latitude: number,
  maxDistanceInMeters?: number
) => {
  try {
    const users = await User.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          $maxDistance: 5000,
        },
      },
    });
    return users;
  } catch (error) {
    console.error('Error finding users near location:', error);
    return [];
  }
};

export const OrderReqService = {
  createOrder,
  findUsersNearLocation,
};
