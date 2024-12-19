import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IInformativeVideo } from './informativeVideo.interface';
import { InformativeVideo } from './informativeVideo.model';

const createInformativeVideo = async (payload: Partial<IInformativeVideo>) => {
  const result = await InformativeVideo.create(payload);

  if (!result) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      'InformativeVideo not created!'
    );
  }

  return result;
};

export const InformativeVideoService = {
  createInformativeVideo,
};
