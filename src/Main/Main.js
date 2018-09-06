import React, { Component } from 'react';

import Form from './Form'
import ProductList from '../common/ProductList'
import { convert2Woo } from '../common/utilities'

import './Main.css'

class Main extends Component {
  state = {
    productUrl: '',
    loading: false,
    product: null,
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
    const { client, appState } = this.props;
    this.setState({
      loading: true,
    });

    try {
      const data = convert2Woo(product);
      const profitMargin = parseFloat(appState.profitMargin);

      const newData = {
        ...data,
        regular_price: (parseFloat(data.regular_price) + profitMargin).toFixed(2),
        sale_price: (parseFloat(data.sale_price) + profitMargin).toFixed(2)
      };

      console.log(newData);

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
        <Form data={{ productUrl }} disabled={loading} onChange={this.updateProductUrl('productUrl')} onSubmit={this.handleSearch}/>
        { product && <ProductList disabled={loading} products={[product]} onImportRequest={this.handleImport} />}
      </div>
    );
  }
}

export default Main;
