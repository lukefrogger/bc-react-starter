# How to add a new page

You may wish to add a new page to the theme. To do this we will need to add a new page component in the `src/pages` section, then we will have to update the router so that the new url for your page is created.

Optionally we can then update a menu to include your new page.

## Create a new page component.

Go to the `src/pages` folder and create a new folder within it with your new page name. For this example we are going to use `my-page`.

Inside your `my-page` folder, create two new files.

- `index.ts`
- `my-page.tsx` **note this must be a `.tsx` file.**

open up `my-page.tsx`. First we need to import `react`.

```js
import * as React from 'react'
```

Then we will need to create our page component.

```js
import * as React from 'react'

export function MyPage(): React.ReactElement {
    return (
        <h1>My Page</h1>
    )
}

```

You will want to flesh this page out later, but for now lets just get the page created and router working.

Open up `index.ts`

Export our `my-page.tsx` page from this file.

```js
export * from './my-page'

```

Then Navigate to `src/pages/index.ts` and open this file. Add the `my-page` export to the list, making sure that the list remains in alphabetical order. 

For our `my-page` example this means it will be between the `login` and the `order` pages.

```js
...
export * from './login'
export * from './my-page' // My Page goes here
export * from './order'
...
```

That's it! Now we need to get the router working.

## Adding a new route to the router.

Go to `src/routers/root.tsx` and open this file.

**NOTE** if you need to create a page that requires authentication to view, then please open: `src/routers/user.tsx` instead.

The pages are imported at the top of the file. We need to add MyPage to the list of pages to be imported. Make sure the list remains in alphabetical order.

```js
import {
  ...
  LoginPage,
  MyPage // add MyPage component here.
  ProductPage,
  ...
} from '@pages'
```

in the `export function RootRouter(): React.ReactElement {` function we will need to add our new route. It is best to group it with other pages of a similar type, but this is not necessary.

In the `Switch` component add in your new page and give it a url that makes sense and is not already taken. **Note hyphens don't work in urls**

```js
<Switch>
    <Route exact path="/mypage"> // add my page url here
    <MyPage /> // add my page component here
    </Route>
<Switch>
```

That's it! go to `http://localhost:3000/mypage` to test the page! 

## Optionally add this page to a menu

- To add this page to the main menu see [How to change the menu](#). 
- To add this page to the footer menu, see [How to change the footer](#)