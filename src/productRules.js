export function applyStockRule(product) {
  return product
}

export function prepareProducts(products) {
  return products.map(applyStockRule)
}
