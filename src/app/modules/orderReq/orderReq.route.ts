import express from 'express';
import { OrderReqController } from './orderReq.controller';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLES.CLIENT),
  OrderReqController.createOrder
);

router.get(
  '/get-order-history',
  auth(USER_ROLES.CLIENT),
  OrderReqController.getOrderHistory
);

router.get(
  '/get-order',
  // auth(USER_ROLES.DRIVER),
  OrderReqController.getOrder
);

router.get(
  '/get-single-order/:id',
  // auth(USER_ROLES.DRIVER),
  OrderReqController.getNearestAllOrder
);

router.get('/near', OrderReqController.getAllOrder);

export const OrderReqRoutes = router;
