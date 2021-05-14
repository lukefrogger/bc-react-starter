import * as React from "react";
import { Typography, ProductRowProps } from 'unsafe-bc-react-components';
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import productMock from '../__mocks__/data/product.json';
import storeMock from '../__mocks__/data/store_config.json'



const Container = styled.div`
  --horizontal-spacing: 24px;
  max-width: calc(1208px + (var(--horizontal-spacing) * 2));
  margin: 0 auto;
  padding: 0 var(--horizontal-spacing);
`

const Grid = styled.div`
  @media(min-width: 1024px) {
    display: flex;
    flex-wrap: wrap;
    column-gap: 10%;
    > * {
      min-width: 320px;
    }
  }
`

const ProductList = styled.div`
  margin-bottom: 48px;
  flex: 1;
  @media(min-width: 1024px) {
    margin-bottom: inherit;
  }
`

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(176px, 1fr));
  grid-gap: 2rem;
  align-items: center;
  padding: 48px 0;
  @media(min-width: 768px) {
    padding: 80px 0;
  }
`

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const PRODUCT: ProductRowProps = {
  name: productMock.name,
  variant: 'Blue',
  quantity: {
    defaultQuantity: 1
  },
  prices: {
    currencySettings: { currency: storeMock.currency },
    price: 23,
    salePrice: 0
  },
  image: {
    src: productMock.image_src,
    alt: productMock.image_alt
  }
}

function Product() {
  return (
    <Container>
      {
        // TODO: Add Breadcrumbs
      }
      <Typography
        variant="body-small"
        css={css`
          padding-top: 32px;
        `}>
          Home / Category / Product name
      </Typography>

    </Container>
  );
};

export default Product;
