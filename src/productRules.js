// La regla de negocio literal: precio mayor o igual a 100 y stock menor a 10
export const isLowStock = (product) => product.price >= 100 && product.stock < 10