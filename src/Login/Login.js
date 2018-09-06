import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Login extends Component {
  state = {
    storeUrl: '',
    apiUrl: '',
    consumerKey: '',
    consumerSecret: '',
    profitMargin: '2.99',
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { consumerKey, consumerSecret, storeUrl, apiUrl, profitMargin } = this.state;
    if (consumerKey && consumerSecret && storeUrl && apiUrl && profitMargin) {
      this.props.onLoggedIn(this.state);
    }
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { dialogProps } = this.props;

    return (
      <div>
        <Dialog
          {...dialogProps}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Wellcome</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To use this tool, please provide your Woocommerce Store credentials.
            </DialogContentText>
            <form onSubmit={this.handleSubmit}>
              <TextField
                autoFocus
                margin="dense"
                label="Consumer Key"
                fullWidth
                required
                onChange={this.handleChange('consumerKey')}
              />
              <TextField
                margin="dense"
                label="Consumer Secret"
                fullWidth
                required
                onChange={this.handleChange('consumerSecret')}
              />
              <TextField
                margin="dense"
                label="Store Address"
                type="storeUrl"
                required
                fullWidth
                onChange={this.handleChange('storeUrl')}
              />
              <TextField
                margin="dense"
                label="API Address"
                type="apiUrl"
                required
                fullWidth
                onChange={this.handleChange('apiUrl')}
              />
              <TextField
                margin="dense"
                label="Profit margin"
                required
                defaultValue="2.99"
                fullWidth
                onChange={this.handleChange('profitMargin')}
              />
            </form>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              GO
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Login;
