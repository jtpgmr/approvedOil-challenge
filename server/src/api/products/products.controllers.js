import _ from "lodash"

import ProductModel from "./products.models.js";

const findAllProductsController = async (req, res) => {
  try {
    const products = await ProductModel.find();
  
    res.status(201).json(products);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const registerProductController = async (req, res) => {
  try {
    let newProduct = await ProductModel.create(req.body);

    newProduct = _.omit(newProduct.toObject(), ["password", "_id", "__v", "updatedAt"])
  
    res.status(201).json(newProduct);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

export { findAllProductsController, registerProductController }