# How to use Translation Strings

To make your site multilingual any hard coded copy should have translation strings enabled.

## Add a string to i18n json file.

To add a new text string go to `/src/i18n/en.json` or `fr.json`. This is where you can find all the text strings currently translated in this project.

Find the section in the `.json` file that makes sense to add your string, or create a new section if it makes sense. Then create a new text string in the section.

for example if we wanted to add a new string `My Text String` to the `mycomponent` object in the `en.json` file we could add it in like this:

```json
"mycomponent": {
    "my_string": "My Text String",
    "condimentum": "Condimentum Egestas",
    "vehicula": "Vehicula Fringilla",
  },
```

Don't forget to include the translated string in other languages if you have them.

## Add string to component file

In any template file, we can import translation string dependency at the top of the file:

```js
import { useTranslation } from 'react-i18next'
```

We then need to bring the translation function into our components

```js
export function MyComponent(): React.ReactElement {
  const { t } = useTranslation()
```

Once this is imported we can add the string to anywhere in the component like so:

```js
{
  t('mycomponent.my_string', 'My Text String')
}
```

- The first parameter is the route to the string in the translation.json file
- The second parameter is a fallback string, in case the text string in the translation file is missing.

That's it!

## More information

More info about translation strings can be found here:
https://react.i18next.com/
