import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv"

dotenv.config()

const customerAddressSchema = Schema({
  country: String,
  state: String,
  city: String,
  street: String,
  zip: String
});

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: customerAddressSchema, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Password Hash Function
customerSchema.pre("save", async function (next) {
  let newCustomer = this;

  if (!newCustomer.isModified("password")) {
    return next();
  }

  const saltWorkFactor = process.env.SALT_WORK_FACTOR 

  const salt = await bcrypt.genSalt(parseInt(saltWorkFactor));
  const hash = await bcrypt.hashSync(newCustomer.password, salt);

  newCustomer.password = hash;

  return next();
});

// USER LOGIN FUNCTION
customerSchema.methods.comparePassword = async function (
  loginAttemptPassword
) {
  const customer = this;

  return await bcrypt.compare(loginAttemptPassword, customer.password).catch((err) => false);
};

// applying UserDocument type allows model to use fields and methods
// from the userSchema
const CustomerModel = model("Customer", customerSchema);

export default CustomerModel;