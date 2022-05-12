# Sitemap

There's a sitemap page and a script that generates the sitemap for the shop with all the routes inside `src/routes/routes.tsx`.

### How it works

The script it's located in `src/hooks/use-sitemap.ts` and loop trough all the routes inside the `<Routes>` component and then returns an array of strings with the path prop of the `<Route>` component.

- The page can be found by accessing the /sitemap url.
- The sitemap.xml it's generated inside a public folder running a command.

### How to generate an sitemap.xml

To generate an sitemap.xml you have to run `yarn dev` to start the development server and then run `yarn sitemap` to generate an sitemap.xml file in the `public` folder.

### How to remove urls

You can remove certain urls from the sitemap by going into the `src/hooks/use-sitemap.ts` and adding the url into the `getSitemapLinks` method, eg:

```js
getSitemapLinks(RootRoutes(), {
    excludeParams: [
        '/user/*',
    ],
})
```

The code above will remove the `/users/*` path from the sitemap.

### How to add dynamic data

You can add dynamic data into the sitemap by going into the `src/hooks/use-sitemap.ts` and then adding the data and the url to replace the data into the `getSitemapLinks` method, eg:

```js
const categoriesLinks = [
    `category-1`,
    `category-2`
]

getSitemapLinks(RootRoutes(), {
    includeParams: {
        '/category/:categories': {
            categories: categoriesLinks,
        },
    }
})
```

The code above will add the categories link into the sitemap page by replacing the `/category/:categories` route.

### How to change the hostname of the sitemap.xml file.

You can modify the hostname by editing `REACT_APP_HOSTNAME` variable in the `.env` file, eg:

```
REACT_APP_HOSTNAME=http://bigcommerce.com
```

The code above will change the hostname for the sitemap.xml to `http://bigcommerce.com` and produce this result:

```xml
<loc>http://bigcommerce.com/page-1</loc>
```
