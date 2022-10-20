import { Types } from 'mongoose';
import * as Yup from 'yup';

const idParam = Yup.object({
  id: Yup.string().length(24).resolve((value) => {
    try {
      return new Types.ObjectId(value);
    } catch (error) {
      return false;
    }
  }, 
  // "message" is a Zod property
  {
    message: 'Invalid ObjectId',
  }),
});

export default idParam