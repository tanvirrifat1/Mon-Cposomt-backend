import { model, Schema } from 'mongoose';
import { IInformativeVideo } from './informativeVideo.interface';

const informationVideoSchema = new Schema<IInformativeVideo>(
  {
    video: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const InformativeVideo = model<IInformativeVideo>(
  'InformativeVideo',
  informationVideoSchema
);
