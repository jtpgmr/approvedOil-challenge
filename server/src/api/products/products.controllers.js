import _ from "lodash"

import ProductModel from "./products.models.js";
import { filterObject, filterArrayOfObjects } from "../../utils/filterJsonResponse.js";

const omitProductDataArray = ["_id", "createdAt", "updatedAt", "__v"]

const findAllProductsController = async (req, res) => {
  try {
    const products = await ProductModel.find();

    const filteredProducts = filterArrayOfObjects(products, omitProductDataArray)
  
    res.status(200).json(filteredProducts);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const findSingleProductController = async (req, res) => {
  try {
    const { id } = req.params
    const product = await ProductModel.findById(id);

    const filteredProduct = filterObject(product, omitProductDataArray)
  
    res.status(200).json(filteredProduct);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const registerProductController = async (req, res) => {
  try {
    const newProduct = await ProductModel.create(req.body);

    const filteredNewProduct = filterObject(newProduct, omitProductDataArray)
  
    res.status(201).json(filteredNewProduct);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params
    const updatedProduct = await ProductModel.findByIdAndUpdate({
      _id: id
    },
    {
      $set: req.body
    },
    {
      returnDocument: "after"
    })

    // can create admin model so that if a user is an admin,
    // they receive an unfiltered/complete version of the data

    const filteredUpdatedProduct = filterObject(updatedProduct, omitProductDataArray)
  
    res.status(201).json(filteredUpdatedProduct);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params
    await ProductModel.findByIdAndDelete(id);
  
    res.status(200).json("Product has been deleted.");
    
  } catch (err) {
    res.status(500).json(err);
  }
}

export { findAllProductsController, findSingleProductController, registerProductController, updateProductController, deleteProductController }