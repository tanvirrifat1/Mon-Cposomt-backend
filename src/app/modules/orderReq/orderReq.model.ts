import { model, Schema } from 'mongoose';
import { IOrderReq } from './orderReq.interface';

const orderSchema = new Schema<IOrderReq>({
  userId: { type: String, required: true },
  orderDetails: { type: String, required: true },
  //   location: {
  //     type: { type: String, enum: ['Point'], default: 'Point' },
  //     coordinates: { type: [Number], required: true },
  //   },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  quantity: { type: Number, required: true },
  type: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

orderSchema.index({ location: '2dsphere' });

export const Order = model<IOrderReq>('Order', orderSchema);
