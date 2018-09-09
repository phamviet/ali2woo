import React, { Component } from 'react';

import Main from './Main/Main'
import Login from './Login'
import AliExpress from './AliExpress'
import WooCommerce from './WooCommerce'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    authenticated: false,
    appState: null
  }

  componentDidMount() {
   try {
     const appState = JSON.parse(localStorage.getItem('Ali2WooAppState'));
     if (appState) {
       this.init(appState)
     }
   } catch (e) {
   }
  }

  init(appState) {
    // this.setState({ authenticated: true });
    this.setState({ appState });
    this.client = new WooCommerce(appState);
    this.ali = new AliExpress({ url: appState.apiUrl });
  }

  handleLoggedIn = (appState) => {
    localStorage.setItem('Ali2WooAppState', JSON.stringify(appState));
    this.setState(() => ({ authenticated: true }), () => {
      this.init(appState)
    })
  }

  render() {
    const { authenticated, appState } = this.state;
    const dialogProps = {
      open: !authenticated,
      disableBackdropClick: true,
      disableEscapeKeyDown: true,
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Ali2Woo</h1>
        </header>
        {authenticated && <Main appState={appState} client={this.client} ali={this.ali} />}
        <Login appState={appState} key={`login-modal-${authenticated ? 'no' : 'yes'}`} dialogProps={dialogProps} onLoggedIn={this.handleLoggedIn}/>
      </div>
    );
  }
}

export default App;
