const calculateTotalCost = (products) => {
  let total = 0
  for (let i = 0; i < products.length; i++) {
    console.log(products)
    total += products[i].total
  }
  return total.toFixed(2)
}

export default calculateTotalCost