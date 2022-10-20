import * as Yup from "yup"

const productSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  type: Yup.string().email().required("Email is required."),
  price: Yup.number().required(),
  expiration: Yup.date().nullable().required()
})

export default productSchema;