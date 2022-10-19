import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import * as customerControllers from './customers.controllers.js'
import customerSchema from './customers.validator.js';

// import validateRequest from '../../middlewares/validateRequest';

// import { userSchema } from './users.schema';

const customerRoutes = Router();

// customerRoutes.get('/', UsersControllers.getAllUsers);

customerRoutes.post('/', validateRequest({ body: customerSchema }), customerControllers.registerUserController);

export default customerRoutes;