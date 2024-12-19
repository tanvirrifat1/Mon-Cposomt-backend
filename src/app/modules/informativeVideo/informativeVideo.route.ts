import express, { NextFunction, Request, Response } from 'express';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import auth from '../../middlewares/auth';
import { USER_ROLES } from '../../../enums/user';
import { InformativeVideoValidation } from './informativeVideo.validation';
import { InformativeVideoController } from './informativeVideo.controller';

const router = express.Router();

router.post(
  '/create',
  fileUploadHandler(),
  auth(USER_ROLES.ADMIN),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = InformativeVideoValidation.createInformativeVideoSchema.parse(
      JSON.parse(req.body.data)
    );
    return InformativeVideoController.createInformativeVideoIntoDb(
      req,
      res,
      next
    );
  }
);

export const InformativeVideoRoutes = router;
