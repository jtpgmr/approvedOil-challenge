import _ from "lodash"

import { filterObject, filterArrayOfObjects } from "../../utils/filterJsonResponse.js";
import CustomerModel from "./customers.models.js";

const omitCustomerDataArray = ["password", "_id", "__v", "updatedAt"]

const findAllCustomersController = async (req, res) => {
  try {
    const customers = await CustomerModel.find();
  
    const filteredCustomers = filterArrayOfObjects(customers, omitCustomerDataArray)
  
    res.status(200).json(filteredCustomers);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const findSingleCustomerController = async (req, res) => {
  try {
    const { id } = req.params
    const customer = await CustomerModel.findById(id);

    const filteredCustomer = filterObject(customer, omitCustomerDataArray)
  
    res.status(200).json(filteredCustomer);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const registerCustomerController = async (req, res) => {
  try {
    const { email, phone } = req.body
    if (await CustomerModel.findOne({ email })) {
      return res.status(409).send({ message: "User with this email already exists." })
    }

    if (await CustomerModel.findOne({ phone })) {
      return res.status(409).send({ message: "User with this phone number already exists." })
    }


    const newCustomer = await CustomerModel.create(req.body);

    const filterNewCustomer = filterObject(newCustomer, omitCustomerDataArray)
  
    res.status(201).json(filterNewCustomer);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateCustomerController = async (req, res) => {
  try {
    const { id } = req.params

    const updatedCustomer = await CustomerModel.findByIdAndUpdate({
      _id: id
    },
    {
      $set: req.body
    },
    {
      returnDocument: "after"
    })

    if (!updatedCustomer) {
      return res.status(404).json("Customer profile does not exist.")
    }
  
    const filteredUpdatedCustomer = filterObject(updatedCustomer, omitCustomerDataArray)
  
    res.status(200).json(filteredUpdatedCustomer);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteCustomerController = async (req, res) => {
  try {
    const { id } = req.params
    const deletedCustomer = await CustomerModel.findByIdAndDelete(id);

    if (!deletedCustomer) {
      return res.status(404).json("Customer profile does not exist.")
    }
  
    res.status(200).json("Customer profile has been deleted.");
    
  } catch (err) {
    res.status(500).json(err);
  }
}

export { findAllCustomersController, findSingleCustomerController, registerCustomerController, updateCustomerController, deleteCustomerController }