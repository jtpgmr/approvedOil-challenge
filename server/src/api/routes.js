import express from 'express';

import customerRoutes from './customers/customers.routes.js';

// const apiRoutes = (app: Express) => {

// app.get("/apiHealth", (req: Request, res: Response) => res.sendStatus(200))

// app.use('/rooms', roomRoutes);
// // router.use('/users', users);
// }

const apiRoutes = express.Router();

  apiRoutes.get("/apiHealth", (req, res) => res.sendStatus(200))
  
  apiRoutes.use('/customers', customerRoutes);


export default apiRoutes;