import mongoose from 'mongoose';
import { IClient } from './client.interface';

const ClientSchema = new mongoose.Schema<IClient>(
  {
    address: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    firstName: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      default: '',
    },
    lastName: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'deleted'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

export const Client = mongoose.model<IClient>('Client', ClientSchema);
