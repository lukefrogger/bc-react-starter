import * as React from "react";
import { Typography, ProductRow, ProductRowProps, Pricing, Button  } from 'unsafe-bc-react-components';
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

const PRODUCTS: ProductRowProps[] = [PRODUCT, PRODUCT, PRODUCT]

const Cart = () => {
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
          Home / Cart
      </Typography>
      <Typography
        as="h1"
        variant="display-xx-small"
        css={css`
          padding: 32px 0 24px;
        `}
      >
        YOUR ORDER
      </Typography>
      <Grid>
        <ProductList>
          {PRODUCTS.map(product => (
            <ProductRow {...product}/>
          ))}
        </ProductList>
        <div>
          <Pricing
            items={[
              {
                label: 'Subtotal',
                price: {
                  price: 80,
                  salePrice: 0,
                  currencySettings: {}
                }
              },
              {
                label: 'Taxes',
                price: {
                  price: 11,
                  salePrice: 0,
                  currencySettings: {}
                }
              },
            ]}
            total={
              {
                label: 'Total',
                price: {
                  price: 91,
                  salePrice: 0,
                  currencySettings: {}
                }
              }
            }
          />
          <Button style={{ width: "100%", marginTop: 48 }}>Proceed to checkout</Button>
        </div>
      </Grid>
      <Features>
        <Feature>
          <svg width={38} height={45} viewBox="0 0 38 45" fill="none">
            <path
              d="M27 22H11v10h16V22zM15 22v-6a4.012 4.012 0 014-4v0a4.012 4.012 0 014 4v6"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
            <path
              d="M37 26a18 18 0 11-36 0V6l18-4 18 4v20z"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
          <Typography as="span" variant="overline">100% secure</Typography>
        </Feature>
        <Feature>
          <svg width={47} height={35} viewBox="0 0 47 35" fill="none">
            <path
              d="M37.5 27.5h8v-12l-6-2-4-12h-18v26h8"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
            />
            <path
              d="M31.5 33.5a6 6 0 100-12 6 6 0 000 12zM25.5 7.5v6h6M11.5 1.5h-10M11.5 9.5h-6M11.5 17.5h-2"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
          <Typography as="span" variant="overline">Fast shipping</Typography>
        </Feature>
        <Feature>
          <svg width={40} height={38} viewBox="0 0 40 38" fill="none">
            <path
              d="M37.815 25.982H13.49A12.49 12.49 0 0113.49 1h12.49"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
            />
            <path
              d="M27.296 15.463l10.519 10.519L27.296 36.5"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
          <Typography as="span" variant="overline">Easy returns</Typography>
        </Feature>
        <Feature>
          <svg width={37} height={37} viewBox="0 0 37 37" fill="none">
            <path
              d="M1 8.954h35"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
            />
            <path
              d="M36 8.955L26.454 1H10.545L1 8.955V36h35V8.955z"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
            <path
              d="M23.271 20.09h-9.545V8.956L16.908 1h3.182l3.181 7.955V20.09z"
              stroke="#191919"
              strokeWidth={2}
              strokeMiterlimit={10}
              strokeLinecap="square"
            />
          </svg>
          <Typography as="span" variant="overline">Safely packaged</Typography>
        </Feature>
      </Features>
    </Container>
  );
};

export default Cart;
