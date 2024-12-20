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

router.get('/near', OrderReqController.getAllOrder);

export const OrderReqRoutes = router;
