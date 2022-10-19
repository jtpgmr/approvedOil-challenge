import dotenv from 'dotenv';

dotenv.config();

const validateRequest = (resource) => {
  return async (req, res, next) => {
    try { 
      if (resource.params) {
        req.params = await resource.validate(req.params);
      }

      if (resource.body) {
        req.body = await resource.validate(req.body);
      }

      if (resource.query) {
        req.query = await resource.validate(req.query);
      }

      next();
    } catch (err) {
      next(err.errors);
    }
  };
};

export default validateRequest;