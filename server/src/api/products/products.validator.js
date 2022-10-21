import * as Yup from "yup"
import { productTypeEnum } from "./products.models.js";

const productSchema = Yup.object({
  name: Yup.string().required("Name is required."),
  type: Yup.mixed().oneOf(Object.values(productTypeEnum)),
  price: Yup.number().required(),
  expiration: Yup.date()
})

export const updateProductSchema = Yup.object({
  name: Yup.string(),
  type: Yup.mixed().oneOf(Object.values(productTypeEnum)),
  price: Yup.number(),
  expiration: Yup.date()
}).noUnknown()

export default productSchema;