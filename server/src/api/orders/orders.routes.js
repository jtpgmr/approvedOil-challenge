import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import * as orderControllers from "./orders.controllers.js"
import orderSchema from './orders.validator.js';
import idParam from '../../utils/idParam.js';

const orderRoutes = Router();

orderRoutes.get('/', orderControllers.findAllOrdersController);

orderRoutes.get('/:id', validateRequest({ params: idParam }), orderControllers.findSingleOrderController);

orderRoutes.post('/', validateRequest({ body: orderSchema }), orderControllers.createOrderController);

// orderRoutes.patch('/:id', validateRequest({ params: idParam, body: updateProductSchema }), productControllers.updateProductController);

orderRoutes.delete('/:id', validateRequest({ params: idParam }), orderControllers.deleteOrderController);

export default orderRoutes;