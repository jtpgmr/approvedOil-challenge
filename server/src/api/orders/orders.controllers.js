import _ from "lodash"

import OrderModel from "./orders.models.js"
import CustomerModel from "../customers/customers.models.js"
import ProductModel from "../products/products.models.js"
import { filterArrayOfObjects, filterObject } from "../../utils/filterJsonResponse.js"

const omitOrderDataArray = ["_id", "__v", "updatedAt", "product._id"]

const findAllOrdersController = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    const filteredOrders = filterArrayOfObjects(orders, omitOrderDataArray)
  
    res.status(200).json(filteredOrders);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const findSingleOrderController = async (req, res) => {
  try {
    const { id } = req.params
    const order = await OrderModel.findById(id);

    const filteredOrder = filterObject(order, omitOrderDataArray)
  
    res.status(200).json(filteredOrder);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const createOrderController = async (req, res) => {
  try {
    const orderingCustomer = await CustomerModel.findById(req.body.customer)

    if (!orderingCustomer) {
      return res.status(404).json("Customer does not exist")
    }

    req.body.product.forEach(async (product) => 
    {
      const { productId } = product
      console.log(productId)
      const foundProduct = await ProductModel.findById(productId)
      console.log(foundProduct)
      if (!foundProduct) {
        return res.status(404).json(`Product with the ID ${productId} was not found.`)
      }
    })

    const newOrder = await OrderModel.create(req.body)

    res.status(201).json(newOrder)
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateOrderController = async (req, res) => {

}

const deleteOrderController = async (req, res) => {
  try {
    const { id } = req.params
    await OrderModel.findByIdAndDelete(id);
  
    res.status(200).json("Product has been deleted.");
    
  } catch (err) {
    res.status(500).json(err);
  }
}

export { findAllOrdersController, findSingleOrderController, createOrderController, updateOrderController, deleteOrderController }