import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import idParam from '../../utils/idParam.js';
import * as customerControllers from './customers.controllers.js'
import customerSchema, { updateCustomerSchema } from './customers.validator.js';

const customerRoutes = Router();

customerRoutes.get('/', customerControllers.findAllCustomersController);

customerRoutes.get('/:id', validateRequest({ params: idParam }), customerControllers.findSingleCustomerController);

customerRoutes.post('/', validateRequest({ body: customerSchema }), customerControllers.registerCustomerController);

customerRoutes.patch('/:id', validateRequest({ params: idParam, body: updateCustomerSchema }), customerControllers.updateCustomerController);

customerRoutes.delete('/:id', validateRequest({ params: idParam }), customerControllers.deleteCustomerController);

export default customerRoutes;