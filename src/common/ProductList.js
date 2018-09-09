import React  from 'react';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  container: {
    padding: 20
  },
  avatar: {
    width: 250,
    height: 250,
  },
  gutter: {
    marginTop: 20
  },
  space: {
    margin: 10
  },
  square: {
    borderRadius: 0,
  }
};

const ProductList = ({ products, ...other }) => {
  return (
    <Grid className={classNames(other.classes.container)}>
      {products.map(product => (<Product key={product.productId} product={product} {...other} />))}
    </Grid>
  )
}

const Product = ({ product, onImportRequest, calculateProfitablePrice, usd2Pound, disabled = false, classes }) => {
  const { productTitle, originalPrice, discountPrice, imageUrl, thumbnailUrls } = product
  return (
    <Grid direction="row" wrap="nowrap" container>
      <Avatar classes={{ root: classes.square }} src={imageUrl} className={classNames(classes.avatar)} />
      <Grid container direction="column" wrap="nowrap" alignItems="flex-start">
        <Typography variant="title">{productTitle}</Typography>
        <Typography component="del">${originalPrice}</Typography>
        <Typography variant="subheading"><strong>${discountPrice}</strong></Typography>
        <Typography variant="subheading"><strong>Store Price ${calculateProfitablePrice(discountPrice)} - £{usd2Pound(calculateProfitablePrice(discountPrice))}</strong></Typography>
        <Grid container direction="row">
          {thumbnailUrls.map(src => <Avatar classes={{ root: classNames(classes.space, classes.square) }} src={src} key={src} />)}
        </Grid>
        <Button onClick={() => onImportRequest(product)} disabled={disabled} variant="contained" color="secondary">Import</Button>
      </Grid>
    </Grid>
  )
}

ProductList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductList);
