# How to change Component Styles

This theme uses `@emotion/react` for writing CSS in JS. You can read more about this library in their docs, which are available here: `https://emotion.sh/docs/introduction`

## Writing CSS in a styles.ts

When you go to an existing component, you will notice there is a styles.ts file in the component directory. This is the prefered way that we write styles for this project.

### Create simple styled component

To create your own style sheet for a component

- create a `styles.ts` file.
- Import emotion.

```
import { css } from '@emotion/react'
```

- Export a CSS module like this:

```js
export const container = css`
  styles: here;
`
```

- in the `component.tsx` file we need to import all the styles from `styles.ts`.

`import * as styles from './styles'`

- We can then apply the styles to our JSX using the `css=` property

```js
return <div css={styles.container}>...</div>
```

### Use styles from BigCommerceThemeComponents

We can also use colors, font sizes and media queries which were set up in the `BigCommerceThemeComponents` Module.

In the `styles.tx` file we import the `SerializedStyles & Theme` modules from `@emotion`

`import { css, SerializedStyles, Theme } from '@emotion/react'`

Then we import `SerializedStyles & Theme` into the styles function

```js
export const container = (theme: Theme): SerializedStyles => css`
  styles: here;
`
```

Now we have access to the colors, typography and media queries through the `theme` object.

#### Media Queries

To use the predefined media queries in the styles, add this template literal `${theme.mq[2]}` to the css, which enables you to add your styles for the media size between the `{}` as normal.

```js
export const container = (theme: Theme): SerializedStyles => css`
  styles: here;

  ${theme.mq[2]} {
    styles: here;
  }
`
```

The list of media queries are as follows:

```js
theme.mq[0] = @media (min-width: 425px)
theme.mq[1] = @media (min-width: 768px)
theme.mq[2] = @media (min-width: 992px)
theme.mq[3] = @media (min-width: 1024px)
theme.mq[4] = @media (min-width: 1440px)
```

#### Colors

To use the predefined colors set in the theme, we need to use this template literal `${theme.colors.primary}` and add it to a `color` or `background` style

```js
export const container = (theme: Theme): SerializedStyles => css`
  background-color: ${theme.colors.primary};
`
```

To use a background color with a hyphen in it's name, we will need to write the color like this: `${theme.colors['neutral-0']}`

The list of predefined colors are as follows:

```js
primary: '#5400DC',
'primary-60': '#3D009F',
attention: '#DC004F',
neutral: '#8E8E8E',
'neutral-0': '#FFFFFF',
'neutral-10': '#F5F5F5',
'neutral-15': '#EAEAEA',
'neutral-30': '#C1C1C1',
'neutral-40': '#ABABAB',
'neutral-50': '#8E8E8E',
'neutral-55': '#757575',
'neutral-90': '#333333',
'neutral-95': '#191919',
'neutral-100': '#000000',
success: '#3ec889',
danger: '#ff0012',
info: '#168fc0',
warning: '#ffbf00',
```

#### Typography

To add existing Typography to your styles we will need to add the `${theme.typography['display-xx-small'] as any}` template literal. The typography styles are bundled with the correct font, weight, size, line-height, style and letter-spacing for each of these variables. If you wish to override any of the styles, just add the override style underneath the typography import.

```js
export const container = (theme: Theme): SerializedStyles => css`
  ${theme.typography['body'] as any}
  override: here;
`
```

The list of predefined typography styles are as follows:

```js
'display-xxx-large' // 'Red Hat Display' Size: 80px Weight: 900
'display-xx-large' // 'Red Hat Display' Size: 64px Weight: 900
'display-x-large' // 'Red Hat Display' Size: 52px Weight: 900
'display-large' // 'Red Hat Display' Size: 46px Weight: 900
'display' // 'Red Hat Display' Size: 36px Weight: 900
'display-small' // 'Red Hat Display' Size: 26px Weight: 700
'display-x-small' // 'Red Hat Display' Size: 19px Weight: 900
'display-xx-small' // 'Red Hat Display' Size: 16px Weight: 700
'body-large' // 'Red Hat Text' Size: 21px Weight: 400
'body' // 'Red Hat Text' Size: 19px Weight: 400
'body-bold' // 'Red Hat Text' Size: 19px Weight: 700
'body-small' // 'Red Hat Text' Size: 16px Weight: 400
'overline' // 'Red Hat Text' Size: 16px Weight: 400
```

#### Extending existing styles

We can also extend existing styles in the style sheet to account for a different style variation of the component.

For a simple style we can just add the `${container}` variable into the styles

```js
export const container = css`
  styles: here;
`
// extended styles
export const containerExtended = css`
  ${container}

  styles: here;
`
```

For a more complex styles we can need to pass the theme prop into the container function like this: `${container(theme)}`

```js
export const container = (theme: Theme): SerializedStyles => css`
  styles: here;
`

// extended styles
export const containerExtended = (theme: Theme): SerializedStyles => css`
  ${container(theme)}

  styles: here;
`
```

## Adding inline styles to JSX or Components

A different way to add styles is to use inline styles directly on the JSX elements such as `<div>` or components such as `<Logo />`.

This is not the prefered method of adding styles, as this can get complex quite quickly, but it can be useful for small changes

In the `component.tsx` file, import `@emotion/react`.

```js
import { css } from '@emotion/react'
```

Find the JSX element or component and add the css inline like this:

```js
<div
  css={css`
    css: here;
  `}
/>
```

or for components:

```js
<Logo
  css={css`
    css: here;
  `}
/>
```

We can also use styles from `BigCommerceThemeComponents` inline similar to they way they are used in styles.tx file.

first we need to import `useTheme` from `@emotion/react`

```js
import { css, useTheme } from '@emotion/react'
```

In the component function we can set up a variable for the useTheme function.

```js
export function Component(): React.ReactElement {
  const theme = useTheme()
}
```

Then apply the theme styles to inline css

```js
export function Component(): React.ReactElement {
  const theme = useTheme()
  return (
    <div
      css={css`
        background: ${theme.colors.primary};
      `}
    >
      ...
    </div>
  )
}
```
