import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    padding: 20
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

const Form = ({ data, onChange, onSubmit, classes, disabled = false }) => {
  return (
    <form onSubmit={onSubmit} className={classes.container} noValidate autoComplete="off">
      <TextField
        disabled={disabled}
        id="productUrl"
        label="Product URL"
        className={classes.textField}
        value={data['productUrl']}
        onChange={onChange}
        margin="normal"
        type="url"
        required
        fullWidth
      />
    </form>
  )
}

export default withStyles(styles)(Form);
