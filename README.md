# Getting Started with BigCommerce React Starter

This is the BigCommerce React Starter, built with the
storefront-data-hooks library and the storefront-ui-components library
to put together a starter storefront.

To install dependencies, run:

```
yarn
```

## Set environment variables

The below environment variables are needed to run the starter:

```
BIGCOMMERCE_STORE_API_TOKEN=
BIGCOMMERCE_STORE_API_CLIENT_ID=
BIGCOMMERCE_STORE_HASH=
BIGCOMMERCE_STORE_API_URL=
BIGCOMMERCE_STOREFRONT_API_URL=
BIGCOMMERCE_STOREFRONT_API_TOKEN=
BC_STARTER_SERVER_PORT=3030
REACT_APP_API_ENDPOINT=http://localhost:3030/api
REACT_APP_CART_ENDPOINT=http://localhost:3030/cart
```

A few notes:
- `BIGCOMMERCE_STORE_API_TOKEN`, `BIGCOMMERCE_STORE_API_CLIENT_ID`, `BIGCOMMERCE_STORE_HASH`, `BIGCOMMERCE_STORE_API_URL`,
`BIGCOMMERCE_STOREFRONT_API_URL` can all be acquired from bigcommerce
and your developer documentation
- `BIGCOMMERCE_STOREFRONT_API_URL` is the bigcommerce graphql endpoint
- To generate the graphql token: `BIGCOMMERCE_STOREFRONT_API_TOKEN`, set
  all the other environment variables first, and run `yarn regen`.  This
will generate a graphql token that expires in 24 hrs.

## (Optional) Link dependencies

When developing locally, you might need to update some code in the components library. For this use case, it's best to link the local components library using npm links so you don't need to publish a new version to the npm registry.

You can do this by:
1. updating package.json to use the linked versions (update paths accordingly):
```json
    "unsafe-bc-react-components": "link:../bigcommerce-react-theme-components",
    "react-dom": "link:../bigcommerce-react-theme-components/node_modules/react-dom",
    "react": "link:../bigcommerce-react-theme-components/node_modules/react",
    "@emotion/react": "link:../bigcommerce-react-theme-components/node_modules/@emotion/react",
```
2. running `yarn`

Unfortunately, we need to link other libs like React and Emotion too to make sure there aren't conflicts in the versions between this repo and components repo. When reverting back to npm registry versions, please run `yarn install --force` afterward.

Make sure you don't commit the updated package.json.

## Available Scripts

In the project directory, you can run:

### `yarn dev``

Runs the node server and the development server.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn start`

Runs the node server.\
Open [http://localhost:3030](http://localhost:3030) to view it in the browser.

Assets will be served from the `build` folder generated by the `yarn
build` command.
