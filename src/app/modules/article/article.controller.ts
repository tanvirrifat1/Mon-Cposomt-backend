import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ArticleService } from './article.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import getFilePath from '../../../shared/getFilePath';
import { delCache, getCache, setCache } from '../../../shared/redisCash';

const createArticle = catchAsync(async (req: Request, res: Response) => {
  let image = getFilePath(req.files, 'images');

  const value = {
    image,
    ...req.body,
  };

  const cacheKeyPattern = 'allArticles:{}'; // Adjust pattern if needed
  await delCache(cacheKeyPattern); // Delete all matching cache keys

  const result = await ArticleService.createArticaleToDB(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Article created successfully',
    data: result,
  });
});

// const getAllArticle = catchAsync(async (req: Request, res: Response) => {
//   const result = await ArticleService.getAllArticle(req.query);
//   sendResponse(res, {
//     success: true,
//     statusCode: StatusCodes.OK,
//     message: 'Article retrived successfully',
//     data: result,
//   });
// });

const getAllArticle = catchAsync(async (req: Request, res: Response) => {
  const cacheKey = `allArticles:${JSON.stringify(req.query)}`;
  const cachedData = await getCache(cacheKey);

  if (cachedData) {
    return sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'Articles retrieved successfully.',
      data: cachedData,
    });
  }

  const result = await ArticleService.getAllArticle(req.query);

  // Cache the data with a TTL of 10 minutes
  setCache(cacheKey, result, 500);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Articles retrieved successfully.',
    data: result,
  });
});

const getSingleArticle = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.getSingleArticle(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single Article retrived successfully',
    data: result,
  });
});

const updatedArticle = catchAsync(async (req: Request, res: Response) => {
  let image;
  if (req.files && 'image' in req.files && req.files.image[0]) {
    image = `/images/${req.files.image[0].filename}`;
  }

  const value = {
    image,
    ...req.body,
  };

  const cacheKeyPattern = 'allArticles:{}'; // Adjust pattern if needed
  await delCache(cacheKeyPattern); // Delete all matching cache keys

  const result = await ArticleService.updateArticle(req.params.id, value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Article updated successfully',
    data: result,
  });
});

const deleteArticle = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.deleteArticle(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Article deleted successfully',
    data: result,
  });
});

export const ArticleController = {
  createArticle,
  getAllArticle,
  getSingleArticle,
  updatedArticle,
  deleteArticle,
};

// export const updateUser = catchAsync(async (req: Request, res: Response) => {
//   const { name, age, gender, address } = req.body;
//   const lang = (req.headers.lang as string) || 'es';

//   let decoded;
//   try {
//     decoded = verifyToken(req.headers.authorization, lang);
//   } catch (error: any) {
//     return sendError(res, error);
//   }

//   const userId = decoded.id as string;

//   const user = await findUserById(userId);
//   if (!user) {
//     return sendError(res, {
//       statusCode: httpStatus.NOT_FOUND,
//       message: lang === 'es' ? 'Usuario no encontrado.' : 'User not found.',
//     });
//   }

//   const updateData: any = {};
//   if (name) updateData.name = name;
//   if (age) updateData.age = age;
//   if (gender) updateData.gender = gender;
//   if (address) updateData.address = address; // Corrected from 'gender' to 'address'

//   if (req.file) {
//     const imagePath = `public/images/${req.file.filename}`; // Changed to forward slashes for cross-platform compatibility
//     const publicFileURL = `/images/${req.file.filename}`;

//     updateData.image = {
//       path: imagePath,
//       publicFileURL: publicFileURL,
//     };
//   }

//   const updatedUser = await updateUserById(userId, updateData);

//   if (updatedUser) {
//     // Define the cache key(s) related to the user
//     const userInfoCacheKey = `userInfo:${userId}`;
//     // If there are other cache keys related to the user, define them here
//     // e.g., const bodyFatInfoCacheKey = `bodyFatInfo:${userId}`;

//     // Invalidate the relevant cache entries
//     try {
//       await delCache(userInfoCacheKey);
//       // If you have other cache keys, delete them as well
//       // await delCache(bodyFatInfoCacheKey);
//     } catch (cacheError) {
//       console.error(
//         `Failed to delete cache for key ${userInfoCacheKey}:`,
//         cacheError
//       );
//       // Proceed without failing the request; optionally, log the error
//     }

//     // Optionally, set the updated user data in the cache
//     const responseData = {
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       role: updatedUser.role, // Ensure role is serializable
//       phone: updatedUser.phone,
//       address: updatedUser.address,
//       age: updatedUser.age,
//       gender: updatedUser.gender,
//       image: updatedUser.image?.publicFileURL,
//     };

//     try {
//       await setCache(userInfoCacheKey, responseData, 300); // TTL of 5 minutes (300 seconds)
//     } catch (cacheError) {
//       console.error(
//         `Failed to set cache for key ${userInfoCacheKey}:`,
//         cacheError
//       );
//       // Proceed without failing the request; optionally, log the error
//     }

//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: lang === 'es' ? 'Perfil actualizado.' : 'Profile updated.',
//       data: responseData, // Return the sanitized and updated user data
//       pagination: undefined,
//     });
//   }
// });
