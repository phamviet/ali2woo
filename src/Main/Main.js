import React, { Component } from 'react';

import Form from './Form'
import ProductList from '../common/ProductList'
import { convert2Woo, calculateProfitablePrice, usd2Pound } from '../common/utilities'

import './Main.css'

class Main extends Component {
  state = {
    productUrl: '',
    loading: false,
    product: null,
  }

  calculateProfitablePrice() {
    const { profitMargin, maxProfitMargin } = this.props.appState;
    return function (originalPrice) {
      return calculateProfitablePrice(originalPrice, profitMargin, maxProfitMargin);
    }
  }

  usd2Pound() {
    const { GBPRate } = this.props.appState;
    return function (originalPrice) {
      return usd2Pound(originalPrice, GBPRate);
    }
  }

  convertProduct(product) {
    const { profitMargin, maxProfitMargin, GBPRate } = this.props.appState;
    const { meta_data = [], regular_price, sale_price, ...data } = convert2Woo(product);
    const regularPrice = calculateProfitablePrice(regular_price, profitMargin, maxProfitMargin);

    const regularPriceAsPounds = (parseFloat(regularPrice) * parseFloat(GBPRate)).toFixed(2);
    data.regular_price = (Math.floor(parseFloat(regularPriceAsPounds)) + 0.99).toFixed(2);
    meta_data.push({
      key: 'store_regular_price',
      value: regularPrice,
    });

    if (sale_price) {
      const salePrice = calculateProfitablePrice(sale_price, profitMargin, maxProfitMargin);
      const salePriceAsPounds = (parseFloat(salePrice) * parseFloat(GBPRate)).toFixed(2);
      data.sale_price = (Math.floor(parseFloat(salePriceAsPounds)) + 0.99).toFixed(2);
      meta_data.push({
        key: 'store_sale_price',
        value: salePrice,
      })
    }

    data.meta_data = meta_data;
    return data;
  }

  handleSearch = async (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    try {
      const product = await this.props.ali.getProductDetail(this.state.productUrl);
      this.setState({
        product,
        productUrl: product.productUrl || this.state.productUrl
      });
    } catch (e) {
      console.error(e)
    }

    this.setState({
      loading: false,
    });
  };

  handleImport = async (product) => {
    const { client } = this.props;
    this.setState({
      loading: true,
    });

    const newData = this.convertProduct(product);
    console.log(newData);

    try {
      const res = await client.post('products', newData);
      if (res.message) {
        alert(res.message);
      }

      console.log(res);

    } catch (e) {
      console.error(e)
    }

    this.setState({
      loading: false,
    });
  };

  updateProductUrl = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { productUrl, loading, product } = this.state;

    return (
      <div className="Main">
        <Form data={{ productUrl }} disabled={loading} onChange={this.updateProductUrl('productUrl')}
              onSubmit={this.handleSearch}/>
        {product && <ProductList
          disabled={loading}
          products={[product]}
          onImportRequest={this.handleImport}
          calculateProfitablePrice={this.calculateProfitablePrice()}
          usd2Pound={this.usd2Pound()}
        />}
      </div>
    );
  }
}

export default Main;
