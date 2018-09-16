class AliExpress {
  constructor({ url }) {
    this.url = url;
  }

  _request(method, endpoint, options, data = {}) {
    const url = '/' === this.url.slice(-1) ? this.url : this.url + '/';

    return fetch(url + endpoint, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options.headers || {}),
      },
      body: JSON.stringify(data),
      credentials: 'include',
      ...options,
    }).then(reps => reps.json());
  }

  get(endpoint = '') {
    return this._request('GET', endpoint, { body: null })
  }

  post(endpoint, data) {
    return this._request('POST', endpoint, {}, data)
  }

  getProductDetail(productUrl) {
    return this.get('getProductDetail?productUrl=' + productUrl)
  }
}

export default AliExpress;
