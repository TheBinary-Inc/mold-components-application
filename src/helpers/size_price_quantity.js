const sizePriceQuantity = (products) => {
  let priceRifinement = [];
  products.forEach((product) => {
    let prices = [];
    product.productSizesAndQuantity.forEach((sqp) => {
      let det = {
        price: sqp.replace(/ /g, "").split(">")[1],
        size: sqp.replace(/ /g, "").split(">")[0],
        quantity: sqp.replace(/ /g, "").split(">")[2],
      }
      prices.push(det)
    });
    product.productSizesAndQuantity = prices;
    priceRifinement.push(product);
  });
  return priceRifinement
};

module.exports = sizePriceQuantity;
