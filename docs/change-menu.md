# How to change the Menu

The top menu is a dynamic menu based on the first four categories on the site. To change the menu go to:

`src/components/header/header.tsx`

## Add More Categories

To add more categories to the top level menu (not recommended) find the `dataSliced` variable and modify the code.

For example to change the number of items from 4 to five, find this line:
`const dataSliced = data?.slice(0, 4)`

and change it to this:
`const dataSliced = data?.slice(0, 5)`

You can play around with the [slice function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) achieve get the desired effect

## Add static pages

You may also add static pages to the top level menu. To do this we would need to change the menu in two places, one for the tablet / mobile and one for desktop.

### Change the Mobile menu.

Find the `{isTablet && (` if statement. Everything within this code block will appear on the tablet / mobile menu.

You can add a new link to the menu by adding in a new `<Link>` component:

```js
<Link to="/new-page" onClick={dialog.hide}>
  {t('header.new_page', 'New Page')}
</Link>
```

`to="/new-page"` should be the url of your new page
`onClick={dialog.hide}` closes the pop-up navigation box (otherwise it will stay open after the navigation has completed)
`{t('header.new_page', 'New Page')}` This is the translation string for the navigation item, don't forget to add in the matching entry in the `src/i18n` files for each language you support.

### Change the Desktop menu.

If you would like the link to appear on the desktop menu, we need to add the link in the desktop code block.

Find the `{!isTablet && (` code block (note the `!` before the `isTablet` statement). Everything within this code block will appear on the desktop view.

As above you can add a new link to the menu by adding a new `<Link>` component:

```js
<Link to="/new-page">{t('header.new_page', 'New Page')}</Link>
```

`to="/new-page"` should be the url of your new page
`{t('header.new_page', 'New Page')}` The translation string for the Nav item. This can be the same as the mobile item or different depending on your design.
