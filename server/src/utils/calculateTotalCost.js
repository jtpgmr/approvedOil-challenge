const calculateTotalCost = (products) => {
  let total = 0
  for (let i = 0; i < products.length; i++) {
    console.log(products)
    total += parseFloat(products[i].total)
  }
  return total
}

export default calculateTotalCost