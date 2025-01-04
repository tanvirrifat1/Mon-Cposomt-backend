import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { MessageService } from './message.service';

const sendMesg = catchAsync(async (req, res) => {
  const result = await MessageService.sendMessageToDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Message sent successfully',
    data: result,
  });
});

export const MessageController = {
  sendMesg,
};
