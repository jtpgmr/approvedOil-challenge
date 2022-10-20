import express from 'express';

import customerRoutes from './customers/customers.routes.js';
import productRoutes from './products/products.routes.js';

const apiRoutes = express.Router();

  apiRoutes.get("/apiHealth", (req, res) => res.sendStatus(200))
  
  apiRoutes.use('/customers', customerRoutes);
  apiRoutes.use('/products', productRoutes);

export default apiRoutes;