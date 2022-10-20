import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest.js';
import * as productControllers from "./products.controllers.js"
import productSchema from './products.validator.js';

const productRoutes = Router();

productRoutes.get('/', validateRequest(), productControllers.findAllProductsController);

productRoutes.post('/', validateRequest({ body: productSchema }), productControllers.registerProductController);

export default productRoutes;