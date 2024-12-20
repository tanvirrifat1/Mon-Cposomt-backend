import { Types } from 'mongoose';
import { Wishlist } from './wishList.model';
import { User } from '../user/user.model';
import ApiError from '../../../errors/ApiError';
import { StatusCodes } from 'http-status-codes';

const createWishListToDB = async (
  userId: Types.ObjectId,
  articleId: string
) => {
  const isExist = await Wishlist.findOne({ user: userId, article: articleId });
  if (isExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Article already exist!');
  }

  const result = await Wishlist.create({ user: userId, article: articleId });

  return result;
};

const removeWishListToDB = async (
  userId: Types.ObjectId,
  articleId: string
) => {
  // Attempt to remove the item from the database
  const result = await Wishlist.findOneAndDelete({
    user: userId,
    article: articleId,
  });
  return result;
};
const getAllWishListToDB = async (userId: Types.ObjectId) => {
  const wishlist = await Wishlist.find({ user: userId });
  return wishlist;
};

const myWishList = async (userId: Types.ObjectId) => {
  const wishlist = await Wishlist.find({ user: userId })
    .populate('article')
    .populate({
      path: 'user',
      // select: 'firstName',
    });
  return wishlist;
};

export const WishListService = {
  createWishListToDB,
  removeWishListToDB,
  getAllWishListToDB,
  myWishList,
};
