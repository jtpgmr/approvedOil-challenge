import * as Yup from "yup"
import idParam from "../../utils/idParam.js";

const orderSchema = Yup.object({
  customer: idParam.required(),
  product: Yup.object.shape({
    productId: idParam.required(),
    quantity: Yup.number().min(1).required()
  }),
})

export default orderSchema;