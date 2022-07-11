# Deploy

<a href="https://app.netlify.com/start/deploy?repository=https://github.com/moderntribe/bigcommerce-react-starter#REACT_APP_HOME_CATEGORIES_IDS=18,19&BIGCOMMERCE_CHANNEL_ID=593155&BIGCOMMERCE_STOREFRONT_API_URL=https://store-xs0ffdia6b.mybigcommerce.com/graphql&BIGCOMMERCE_STORE_API_CLIENT_ID=cv5o85n4nfqxks389988ohi6vo6awhy&BIGCOMMERCE_STORE_API_TOKEN=egs4amrk4mdrwsm7ds7tsc8soklu0hy&BIGCOMMERCE_STORE_API_URL=https://api.bigcommerce.com/stores/xs0ffdia6b&BIGCOMMERCE_STORE_HASH=xs0ffdia6b&SECRET_COOKIE_PASSWORD=bcisawesomebcisawesomebcisawesome&BIGCOMMERCE_STOREFRONT_API_TOKEN=eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJjaWQiOjEsImNvcnMiOlsiaHR0cDovL2xvY2FsaG9zdDozMDMwIl0sImVhdCI6MTY4MzY0NzU1NCwiaWF0IjoxNjUyMTExNTU3LCJpc3MiOiJCQyIsInNpZCI6MTAwMTAwNDUwNywic3ViIjoic3dtbnAwbDA5NW43ZHJ0ZnJxZnQxcWpmY3dmZnFldiIsInN1Yl90eXBlIjoyLCJ0b2tlbl90eXBlIjoxfQ._jcAmEg8DbHp_D-27_z7IbzT20H63VGzdOUCK3noNCQhKh1NX3R9Dxgxa8hgykwBfqN7HhpYW9TiXgg5ZJKqaw">
  <img src="https://www.netlify.com/img/deploy/button.svg" alt="Deploy to Netlify"
></a>

# Getting Started with BigCommerce React Starter

This is the BigCommerce React Starter, built with the
storefront-data-hooks library and the storefront-ui-components library
to put together a starter storefront.

To install dependencies, run:

```
yarn
```

## Set environment variables

### For Netlify deploymentment

To deploy to Netlify you'll need to get an API key from BigCommerce. If you've been working locally this won't be a problem. If you don't have local project use this these details to to get an API.

- URL: `https://api.bigcommerce.com/stores/{BC_store_hash}/v3/storefront/api-token`
- Body:

  ```json
  {
    "channel_id": 1,
    "expires_at": 1689088496
  }
  ```

- Headers:
  ```json
  {
    "content-type": "application/json",
    "x-auth-token": BC_access_token,
  }
  ```

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

Copy the `.env.example` file and rename it `.env`. Update this file with relevant keys.

A few notes:

- `BIGCOMMERCE_STORE_API_TOKEN`, `BIGCOMMERCE_STORE_API_CLIENT_ID`, `BIGCOMMERCE_STORE_HASH`, `BIGCOMMERCE_STORE_API_URL`,
  `BIGCOMMERCE_STOREFRONT_API_URL` can all be acquired from bigcommerce
  and your developer documentation
- `BIGCOMMERCE_STOREFRONT_API_URL` is the bigcommerce graphql endpoint
- To generate the graphql token: `BIGCOMMERCE_STOREFRONT_API_TOKEN`, set
  all the other environment variables first, and run `yarn regen`. This
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

### `yarn dev`

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

Assets will be served from the `build` folder generated by the `yarn build` command.
