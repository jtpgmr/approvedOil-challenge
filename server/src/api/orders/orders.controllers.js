import _ from "lodash"

import OrderModel from "./orders.models.js"
import CustomerModel from "../customers/customers.models.js"
import ProductModel from "../products/products.models.js"
import { filterArrayOfObjects, filterObject } from "../../utils/filterJsonResponse.js"
import calculateTotalCost from "../../utils/calculateTotalCost.js"

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
    const { customer, product } = order

    const omitCustomerDataArray = ["_id", "password", "createdAt", "updatedAt", "__v", "address._id"]
    const orderingCustomer = await CustomerModel.findById(customer)
    const filteredCustomerData = filterObject(orderingCustomer, omitCustomerDataArray)

    const orderedProducts = await Promise.all(
      product.map(async (item) => {
      const { productId, quantity } = item
      const orderedItem = await ProductModel.findById(productId)
      const omitExtraData = omitOrderDataArray.concat(["createdAt", "type"])
      const filteredItem = filterObject(orderedItem, omitExtraData)
      filteredItem.quantity = quantity
      filteredItem.total = quantity * filteredItem.price
      return filteredItem
    }))

    const totalCost = calculateTotalCost(orderedProducts)


    const jsonResponse = {
      "customer": filteredCustomerData,
      "product(s)": orderedProducts,
      "totalCost": totalCost
    }

    res.status(200).json(jsonResponse);
    
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

    const { product } = req.body
    
    product.forEach(async (product) => 
    {
      const { productId } = product
      console.log(productId)
      const foundProduct = await ProductModel.findById(productId)
      console.log(foundProduct)
      if (!foundProduct) {
        return res.status(404).json(`Product with the ID ${productId} was not found.`)
      }
    })

    await OrderModel.create(req.body)

    const omitCustomerDataArray = ["_id", "password", "createdAt", "updatedAt", "__v", "address._id"]

    const filteredCustomerData = filterObject(orderingCustomer, omitCustomerDataArray)

    const orderedProducts = await Promise.all(
      product.map(async (item) => {
      const { productId, quantity } = item
      const orderedItem = await ProductModel.findById(productId)
      const omitExtraData = omitOrderDataArray.concat(["createdAt", "type"])
      const filteredItem = filterObject(orderedItem, omitExtraData)
      filteredItem.quantity = quantity
      filteredItem.total = quantity * filteredItem.price
      return filteredItem
    }))

    const totalCost = calculateTotalCost(orderedProducts)

    const jsonResponse = {
      "customer": filteredCustomerData,
      "product(s)": orderedProducts,
      "totalCost": totalCost
    }

    res.status(201).json(jsonResponse)
    
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
  
    res.status(200).json("Order has been deleted.");
    
  } catch (err) {
    res.status(500).json(err);
  }
}

export { findAllOrdersController, findSingleOrderController, createOrderController, updateOrderController, deleteOrderController }