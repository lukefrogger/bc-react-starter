# How to change the Breadcrumbs

The `<Breadcrumb>` component can be used on any page to create breadcrumbs. Go to `src/pages/page-to-modify` to change or add a breadcrumb

First import the `Breadcrumbs` from `@components`.

`import { Breadcrumbs } from '@components'`

In the return page statement, we can add breadcrumbs component like this. This will add a home and new page breadcrumb to the page:

```js
<Breadcrumbs>
  <Breadcrumbs.Item to="/">{t('breadcrumbs.home', 'Home')}</Breadcrumbs.Item>
  <Breadcrumbs.Item>{t('breadcrumbs.new_page', 'New Page')}</Breadcrumbs.Item>
</Breadcrumbs>
```

The `<Breadcrumbs></Breadcrumbs>` component creates a html a wrapper for the breadcrumbs.

The `<Breadcrumbs.Item to="/">{t('breadcrumbs.home', 'Home')}</Breadcrumbs.Item>`component creates individual breadcrumbs. The `to="/"` property contains the breadcrumb link. If the `<Breadcrumbs.Item>` does not contain the `to` property, the breadcrumb will have no link.

The second `<Breadcrumbs.Item>` that marks the current page, does not have a `to` link so will not be clickable.

## To change the Breadcrumb Component

To Change the Breadcrumb component go to `src/components/breadcrumbs/breadcrumbs.tsx`

The HTML output of the breadcrumbs can be changed by adding or changing the `as=""` property. For example to change the breadcrumb wrapper from a span to a div

```js
<Role as="span" css={styles.link} {...(to && { to, as: Link })}>
    {children}
</Role>

// change to div
<Role as="div" css={styles.link} {...(to && { to, as: Link })}>
    {children}
</Role>
```

The styles can be changed by going to `src/components/breadcrumbs/styles.ts` and updating the styles.
