export function convert2Woo({ productId, productTitle, productUrl, originalPrice, discountPrice, imageUrl, thumbnailUrls, availQuantity, attributes, ...product }) {
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

  if (originalPrice) {
    woo.regular_price = calculatePrice(parseFloat(originalPrice)).toFixed(2);
  }

  if (discountPrice) {
    woo.sale_price = calculatePrice(parseFloat(discountPrice)).toFixed(2);
  }

  return woo;
}

export function calculatePrice(originalPrice) {
  const paypalFee = 0.3 + (2.9 * originalPrice) / 100;
  const profitMargin = 2.99;

  return originalPrice + paypalFee + profitMargin
}
