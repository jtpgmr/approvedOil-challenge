import * as Yup from "yup"

const phoneRegExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/

const customerSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  email: Yup.string().email().required("Email is required."),
  address: Yup.object().shape({
    country: Yup.string().required(),
    state: Yup.string().required(),
    city: Yup.string().required(),
    street: Yup.string().required(),
    zip: Yup.number().test('len', 'Zip code must be exactly 5 characters long', val => val.toString().length === 5).required()
  }),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid.').required(),
  password: Yup.string().min(6).required("Password is required."),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
})

export const updateCustomerSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email(),
  address: Yup.object().shape({
    country: Yup.string(),
    state: Yup.string(),
    city: Yup.string(),
    street: Yup.string(),
    zip: Yup.number().test('len', 'Zip code must be exactly 5 characters long', val => val.toString().length === 5)
  }),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid.')
}).noUnknown()

export default customerSchema;