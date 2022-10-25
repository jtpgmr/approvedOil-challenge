import * as Yup from "yup"

const orderSchema = Yup.object({
  customer: Yup.string().email().required(),
  product: Yup.array(Yup.object().shape({
    productId: Yup.string().length(24).required(),
    quantity: Yup.number().min(1).required()
  })).min(1).required(),
})

export const updateOrderSchema = Yup.object({
  product: Yup.array(Yup.object().shape({
    productId: Yup.string().length(24).required(),
    quantity: Yup.number().min(0).required()
  })).min(0).required(),
})

export default orderSchema;