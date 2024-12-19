import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ArticleService } from './article.service';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import getFilePath from '../../../shared/getFilePath';

const createArticle = catchAsync(async (req: Request, res: Response) => {
  let image = getFilePath(req.files, 'images');

  const value = {
    image,
    ...req.body,
  };

  const result = await ArticleService.createArticaleToDB(value);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Article created successfully',
    data: result,
  });
});

export const ArticleController = {
  createArticle,
};
