async function getPriceForProduct(productId) {
  // make request to products Service here
  // and retrieve the product proce based on product id

  return;
}

async function applyDiscountCode(shoppingCart, discountCode) {
  // You might have a separate service or method to validate and apply the discount code
  // For simplicity, let's assume a hypothetical fixed discount for demonstration purposes
  const discountAmount = 5.0;

  // Update the shopping cart with the discounted amount
  shoppingCart.discountCode = discountCode;
  shoppingCart.discountAmount = discountAmount;

  // Update the prices of items in the cart with the discount
  shoppingCart.items.forEach((item) => {
    // Assuming there is a separate service or method to get the product price
    // Here, you might make a request to another service or database to get the product price
    // and apply the discount to the price of each item in the shopping cart
    // For simplicity, let's assume you have a hypothetical getPriceForProduct method
    const productPrice = getPriceForProduct(item.productId);
    item.discountedPrice = productPrice - discountAmount;
  });

  return shoppingCart;
}

module.exports = { getPriceForProduct, applyDiscountCode };
