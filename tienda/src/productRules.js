export function applyStockRule(product) {
  if (product.price >= 100 && product.stock < 10) {
    return { ...product, stock: 10 }
  }
  return product
}

export function prepareProducts(products) {
  return products.map(applyStockRule)
}
