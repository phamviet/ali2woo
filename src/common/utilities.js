export function convert2Woo({ productId, productTitle, productUrl, originalPrice, discountPrice, imageUrl, thumbnailUrls, availQuantity, attributes }) {
  const woo = {
    name: productTitle,
    sku: productId,
    type: 'simple',
    images: thumbnailUrls.map((src, position) => ({
      src: src.replace('_50x50.jpg', '').replace('_640x640.jpg', ''),
      position
    })),
    attributes: (attributes || []).map(({ name, value }) => ({
      name: ':' === name.slice(-1) ? name.replace(':', '') : name,
      options: value,
      visible: true,
    })),
    meta_data: [
      {
        key: 'product_url',
        value: productUrl,
      },
      {
        key: 'external_id',
        value: productId,
      }
    ]
  };

  if (availQuantity) {
    woo.manage_stock = true;
    woo.stock_quantity = availQuantity;
  }

  /*woo.images.unshift({
    src: imageUrl,
    alt: productTitle,
    position: 0,
  });*/

  woo.regular_price = parseFloat(originalPrice);
  woo.meta_data.push({
    key: 'original_regular_price',
    value: woo.regular_price,
  });

  if (discountPrice) {
    woo.sale_price = parseFloat(discountPrice);
    woo.meta_data.push({
      key: 'original_sale_price',
      value: woo.sale_price,
    });
  }

  return woo;
}

export function extraFees(originalPrice) {
  const originalPriceNumber = parseFloat(originalPrice);
  const payPalFee = 0.3 + (0.029 * originalPriceNumber);

  return (originalPriceNumber + payPalFee).toFixed(2)
}

export function calculateProfitablePrice(originalPrice, profitMargin, maxProfitMargin) {
  const profitMarginNumber = parseFloat(profitMargin);
  const maxProfitMarginNumber = parseFloat(maxProfitMargin);
  const originalPriceNumber = parseFloat(extraFees(originalPrice));

  const profitablePrice = ((profitMarginNumber * originalPriceNumber) / 100);
  const profitPrice = profitablePrice < maxProfitMarginNumber ? profitablePrice : maxProfitMarginNumber

  return (profitPrice + originalPriceNumber).toFixed(2)
}

export function usd2Pound(originalPrice, rate) {
  const rateNumber = parseFloat(rate);
  const originalPriceNumber = parseFloat(originalPrice);

  return (rateNumber * originalPriceNumber).toFixed(2)
}
