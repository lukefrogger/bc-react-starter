# How to change the logo

The current logo is an SVG and can be replaced by replacing the existing code with your svg logo.

To do this go to:
`src/components/header/logo.tsx`

## Modifying the SVG

The first line of the `<SVG>` component looks like this:

```
<svg width={169} height={32} viewBox="0 0 169 32" fill="none" {...props}>
```

When adding your new logo, it's probably best to modify this line to suit your needs instead of replacing it entirely.

First we can change the width or height to suit your logo. Unless you wish to make the logo bigger this will keep everything in proportion to the existing heading.

```
width={169} height={32}
```

Next we can change the viewbox for your SVG which you can get from your current SVG code

```
viewBox="0 0 169 32"
```

## Changing Stroke and Fill

Then we can add a fill or stroke to the top level SVG if your logo is all one color. This is currently set to none as different parts of the logo have different colors `fill="#000" stroke="#FFF"`. We can also add these to the individual `<path />` elements as well.

## Adding extra props

The last element on the SVG are the props that are passed down to the SVG. Currently there are no props added to the logo, but this gives you the option to add extra props to the logo. For example you may wish to add an `aria-label` to the logo.

To do this, go to:
`src/components/header/header.tsx`

and find the `<Logo />` component. You can then add an `aria-label` prop like this:

```
<Logo aria-label="Stella Logo" />
```

This will output the following code in the browser:

```
<svg viewBox="0 0 169 32" fill="none" width="169" height="32" aria-label="Stella Logo">
```

This could also be used to add styles to the logo from the header component if for example you need to change the color of the logo based on the header state. For example we import the `css` function from `@emotion/react` and add some inline css to the logo like this:

```
import { css, useTheme } from '@emotion/react'

...

<Logo
    css={css`
        fill: hotpink;
    `}
/>
```

This will add the relevent css for the logo.

## Changing the paths

You can then go ahead and add your logos paths between the `<SVG>` elements. Here you can change the fills or stroke color, the stroke widths and other SVG properties in the usual way.
