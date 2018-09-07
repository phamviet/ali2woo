import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';

class LoginDialog extends Component {
  state = {
    storeUrl: '',
    consumerKey: '',
    consumerSecret: '',
    apiUrl: 'https://aliexpress-api.com/',
    profitMargin: '30',
    maxProfitMargin: '5',
  }

  handleSubmit = (event) => {
    const { consumerKey, consumerSecret, storeUrl, apiUrl, profitMargin } = this.state;
    if (consumerKey && consumerSecret && storeUrl && apiUrl && profitMargin) {
      this.props.onLoggedIn(this.state);
    }

    event.preventDefault();
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { dialogProps, fullScreen } = this.props;
    const { storeUrl, apiUrl, profitMargin, maxProfitMargin } = this.state;

    return (
      <Dialog
        fullScreen={fullScreen}
        {...dialogProps}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Wellcome</DialogTitle>
        <form onSubmit={this.handleSubmit}>
          <DialogContent>
            <DialogContentText>
              To use this tool, please provide your Woocommerce Store credentials.
            </DialogContentText>
            <TextField
              autoFocus
              margin="normal"
              label="Consumer Key"
              fullWidth
              required
              inputProps={{ required: true }}
              onChange={this.handleChange('consumerKey')}
            />
            <TextField
              margin="normal"
              label="Consumer Secret"
              fullWidth
              required
              onChange={this.handleChange('consumerSecret')}
            />
            <TextField
              margin="normal"
              label="Store Address"
              required
              fullWidth
              value={storeUrl}
              onChange={this.handleChange('storeUrl')}
            />
          </DialogContent>
          <DialogContent>
            <Typography variant="subheading">Preferences</Typography>
            <TextField
              margin="dense"
              label="API Address"
              required
              fullWidth
              value={apiUrl}
              onChange={this.handleChange('apiUrl')}
            />
            <TextField
              margin="normal"
              label="Profit Margin"
              required
              fullWidth
              value={profitMargin}
              onChange={this.handleChange('profitMargin')}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
            <TextField
              margin="normal"
              label="Max Profit Margin"
              required
              fullWidth
              value={maxProfitMargin}
              onChange={this.handleChange('maxProfitMargin')}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              GO
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

LoginDialog.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
  fullScreen: PropTypes.bool.isRequired,
};


export default withMobileDialog()(LoginDialog);
;
