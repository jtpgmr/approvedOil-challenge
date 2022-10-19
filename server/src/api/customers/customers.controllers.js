import CustomerModel from "./customers.models.js";

const registerUserController = async (req, res) => {
  try {
    const newCustomer = await CustomerModel.create(req.body);
  
    res.status(201).json(newCustomer);
    
  } catch (err) {
    res.status(409).json(err);
  }
}

export { registerUserController }