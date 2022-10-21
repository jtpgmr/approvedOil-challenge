import _ from "lodash"

import ProductModel from "./products.models.js";

const findAllProductsController = async (req, res) => {
  try {
    let products = await ProductModel.find();

    products = filterJsonResponse(products)
  
    res.status(201).json(products);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const findSingleProductController = async (req, res) => {
  try {
    const { id } = req.params
    let product = await ProductModel.findById(id);

    product = _.omit(product.toObject(), omitDataArray)
  
    res.status(201).json(product);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const registerProductController = async (req, res) => {
  try {
    let newProduct = await ProductModel.create(req.body);

    newProduct = _.omit(newProduct.toObject(), omitDataArray)
  
    res.status(201).json(newProduct);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const product = await ProductModel.findByIdAndUpdate({
      _id: id
    },
    {
      $set: req.body
    },
    {
      returnDocument: "after"
    }
    )

    const filteredProduct = _.omit(product.toObject(), omitDataArray)
  
    res.status(201).json(filteredProduct);
    
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

const omitDataArray = ["_id", "createdAt", "updatedAt", "__v"]

const filterJsonResponse = (mongoObj) => {
  const filteredResponse =  mongoObj.map(doc => {
      return _.omit(doc.toObject(), omitDataArray)
  })

  return filteredResponse
}

export { findAllProductsController, findSingleProductController, registerProductController, updateProductController, deleteProductController }