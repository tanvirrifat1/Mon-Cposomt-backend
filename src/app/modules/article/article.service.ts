import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IArticle } from './article.interface';
import { Article } from './article.model';
import { Category } from '../category/category.model';

const createArticaleToDB = async (payload: Partial<IArticle>) => {
  const isCategoryExist = await Category.findById(payload.category);

  if (!isCategoryExist) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Category not found!');
  }

  const createArticale = await Article.create(payload);

  if (!createArticale) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Articale not created!');
  }

  return createArticale;
};

export const ArticleService = {
  createArticaleToDB,
};
