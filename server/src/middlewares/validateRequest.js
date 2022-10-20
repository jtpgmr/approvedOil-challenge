import dotenv from 'dotenv';
import { ObjectSchema } from 'yup';

dotenv.config();

const validateRequest = (resource) => {
  return async (req, res, next) => {
    try {
      if (resource.params) {
        req.params = await resource.params.validate(req.params);
      }

      if (resource.body) {
        req.body = await resource.body.validate(req.body);
      }

      if (resource.query) {
        req.query = await resource.query.validate(req.query);
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;