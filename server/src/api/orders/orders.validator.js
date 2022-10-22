import * as Yup from "yup"

const orderSchema = Yup.object({
  customer: Yup.string().length(24).required(),
  product: Yup.array(Yup.object().shape({
    productId: Yup.string().length(24).required(),
    quantity: Yup.number().min(1).required()
  })).min(1).required(),
})

export default orderSchema;