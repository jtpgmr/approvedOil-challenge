import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import * as productControllers from "./products.controllers.js"
import productSchema, { updateProductSchema } from './products.validator.js';
import idParam from '../../utils/idParam.js';

const productRoutes = Router();

productRoutes.get('/', productControllers.findAllProductsController);

productRoutes.get('/:id', validateRequest({ params: idParam }), productControllers.findSingleProductController);

productRoutes.post('/', validateRequest({ body: productSchema }), productControllers.registerProductController);

productRoutes.patch('/:id', validateRequest({ params: idParam, body: updateProductSchema }), productControllers.updateProductController);

productRoutes.delete('/:id', validateRequest({ params: idParam }), productControllers.deleteProductController);

export default productRoutes;