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
    // const filteredOrders = filterArrayOfObjects(orders, omitOrderDataArray)

    const filterOrders = await Promise.all(
      orders.map(async (order) => {
      const { customer, product } = order
      const customerInfo = await CustomerModel.findById(customer)
      const filteredCustomerInfo = filterObject(customerInfo, ["_id",   "password", "address.street", "address.zip", "address._id", "phone", "createdAt", "updatedAt", "__v"])
      const orderedProducts = await filterOrderedProducts(product)
      const totalCost = calculateTotalCost(orderedProducts)
      return {
        "customer": filteredCustomerInfo,
        "product(s)": orderedProducts,
        "totalCost": totalCost
      }
    }))
  
    res.status(200).json(filterOrders);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const filterOrderedProducts = async (productsArray) => await Promise.all(
  productsArray.map(async (product) => {
  const { productId, quantity } = product
  const orderedItem = await ProductModel.findById(productId)
  const omitExtraData = omitOrderDataArray.concat(["createdAt", "type"])
  const filteredItem = filterObject(orderedItem, omitExtraData)
  filteredItem.quantity = quantity
  filteredItem.total = quantity * filteredItem.price
  return filteredItem
}))


const findSingleOrderController = async (req, res) => {
  try {
    const { id } = req.params
    const order = await OrderModel.findById(id);
    const { customer, product } = order

    const omitCustomerDataArray = ["_id", "password", "createdAt", "updatedAt", "__v", "address._id"]
    const orderingCustomer = await CustomerModel.findById(customer)
    const filteredCustomerData = filterObject(orderingCustomer, omitCustomerDataArray)

    const orderedProducts = await orderedProductsMap(product)

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
    const orderingCustomer = await CustomerModel.findOne({
      email: req.body.customer })

    if (!orderingCustomer) {
      return res.status(404).json("Customer does not exist")
    }

    const { product } = req.body

    // console.log(product)  

    for (let i=0; i < product.length;i++) {
      const { productId } = product[i]
        const foundProduct = await ProductModel.findById(productId)
        if (!foundProduct) {
          return res.status(404).json(`Product with the ID ${productId} was not found.`)
        }
    }

    const newOrder = await OrderModel.create({
      customer: orderingCustomer.id,
      product: req.body.product
    })

    const omitCustomerDataArray = ["_id", "password", "createdAt", "updatedAt", "__v", "address._id"]

    const filteredCustomerData = filterObject(orderingCustomer, omitCustomerDataArray)

    const orderedProducts = await Promise.all(
      newOrder.product.map(async (item) => {
      const { productId, quantity } = item
      const orderedItem = await ProductModel.findById(productId)
      const omitExtraData = omitOrderDataArray.concat(["createdAt", "type"])
      const filteredItem = filterObject(orderedItem, omitExtraData)
      filteredItem.quantity = quantity
      const itemTotal = quantity * filteredItem.price
      filteredItem.total = itemTotal.toFixed(2)
      return filteredItem
    }))

    const totalCost = calculateTotalCost(orderedProducts)
    console.log(totalCost)

    const jsonResponse = {
      "customer": filteredCustomerData,
      "product(s)": orderedProducts,
      "totalCost": totalCost.toFixed(2),
      "purchaseDate": newOrder.purchaseDate
    }

    res.status(201).json(jsonResponse)
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateOrderController = async (req, res) => {
  try {
    const { id } = req.params
    const { product, customer } = req.body

    if (!id) {
      return res.status(404).json(`Order with the ID ${id} was not found.`)
    }

    let order = await OrderModel.findById(id).where("customer").equals(customer)

    if (!order) {
      return res.status(404).json(`Order with the ID ${id} does not belong to customer ${customer}`)
    }

    // console.log(order)
    // console.log(req.body)

    const orderingCustomer = await CustomerModel.findById(customer)
    
    for (let i=0; i < product.length;i++) {
      const { productId } = product[i]
        const foundProduct = await ProductModel.findById(productId)
        if (!foundProduct) {
          return res.status(404).json(`Product with the ID ${productId} was not found.`)
        }
        // console.log(foundProduct.id == order.product[i].productId)
        console.log(order.product.find((product) => product.productId == foundProduct.id))
        order.product.find((product) => {
          if (product.productId == foundProduct.id) {
            return console.log("hiiii "+product)
          }
        })
    }

    await OrderModel.findByIdAndUpdate(
      {
        _id: id
      },
      {
        $set: req.body
      },
      {
        returnDocument: "after"
      })


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