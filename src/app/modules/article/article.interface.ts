import { Types } from 'mongoose';

export type IArticle = {
  title: string;
  description: string;
  image: string;
  status: 'active' | 'delete';
  category: Types.ObjectId;
};
