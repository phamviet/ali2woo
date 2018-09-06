class WooCommerce {
  constructor({ storeUrl, consumerKey, consumerSecret }) {
    this.url             = storeUrl;
    this.consumerKey     = consumerKey;
    this.consumerSecret  = consumerSecret;
  }

  _request(method, endpoint, options, data = {}) {
    const url = '/' === this.url.slice(-1) ? this.url : this.url + '/';

    return fetch(url + 'wp-json/wc/v2/' + endpoint, {
      method,
      headers: {
        Authorization: 'Basic ' + btoa(`${this.consumerKey}:${this.consumerSecret}`),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(data),
      ...options,
    }).then(reps => reps.json());
  }

  get(endpoint = '') {
    return this._request('GET', endpoint, { body: null })
  }

  post(endpoint, data) {
    return this._request('POST', endpoint, {}, data)
  }
}

export default WooCommerce;
