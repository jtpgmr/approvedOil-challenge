import CustomerModel from "./customers.models.js";
import _ from "lodash"

const findAllCustomersController = async (req, res) => {
  try {
    const customers = await CustomerModel.find();
  
    res.status(201).json(customers);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const findSingleCustomerController = async (req, res) => {
  try {
    const { id } = req.params
    const customer = await CustomerModel.findById(id);
  
    res.status(201).json(customer);
    
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


    let newCustomer = await CustomerModel.create(req.body);

    newCustomer = _.omit(newCustomer.toObject(), ["password", "_id", "__v", "updatedAt"])
  
    res.status(201).json(newCustomer);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const updateCustomerController = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)
    const customer = await CustomerModel.findByIdAndUpdate({
      _id: id
    },
    {
      $set: req.body
    },
    {
      returnDocument: "after"
    }
    )
  
    res.status(201).json(customer);
    
  } catch (err) {
    res.status(500).json(err);
  }
}

const deleteCustomerController = async (req, res) => {
  try {
    const { id } = req.params
    await CustomerModel.findByIdAndDelete(id);
  
    res.status(200).json("Customer profile has been deleted.");
    
  } catch (err) {
    res.status(500).json(err);
  }
}

export { findAllCustomersController, findSingleCustomerController, registerCustomerController, updateCustomerController, deleteCustomerController }