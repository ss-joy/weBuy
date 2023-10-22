export function findProductQuantity(productId, cartDetail) {
  const product = cartDetail.state.find((e) => {
    return e.id === productId;
  });
  return product.quantity;
}
