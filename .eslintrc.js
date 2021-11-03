module.exports = {
  plugins: [
    'simple-import-sort',
    '@typescript-eslint',
    'eslint-comments',
    'jest',
    'promise',
    'react',
    'prettier',
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:eslint-comments/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jest/recommended",
    "plugin:promise/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.eslint.json"
  },
  settings: {
    react: {},
  },
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-key': 1,
    // Too restrictive, writing ugly code to defend against a very unlikely scenario: https://eslint.org/docs/rules/no-prototype-builtins
    'no-prototype-builtins': 'off',
    // https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
    'import/prefer-default-export': 'off',
    'import/no-default-export': 'error',
    // Too restrictive: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    'react/destructuring-assignment': 'off',
    // No jsx extension: https://github.com/facebook/create-react-app/issues/87#issuecomment-234627904
    'react/jsx-filename-extension': 'off',
    // Allow props spreading on elements.
    "react/jsx-props-no-spreading": [0],
    // no need for default props - they're provided through function defaults
    "react/require-default-props": "off",
    "react/no-danger": "off",
    // Use function hoisting to improve code readability
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/no-onchange": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/control-has-associated-label": "off",
    // Makes no sense to allow type inferrence for expression parameters, but require typing the response
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-use-before-define': [
      'error',
      { functions: false, classes: true, variables: true, typedefs: true },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
          ],
          // `react`
					["^react$"],
          // Packages.
          ["^@?\\w"],
          // Internal packages.
          ["^(@api|@components|@config|@hooks|@icons|@pages|@utils)(/.*|$)"], // Match this with ts paths
          // Side effect imports.
          ["^\\u0000"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.s?css$"],
        ],
      },
    ],
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    'jest/no-mocks-import': 'off',
    "react/jsx-no-literals": [1, {"noStrings": true, "allowedStrings": ["+", "|", "(", ")", "#"], "ignoreProps": true, "noAttributeStrings": false }],
    'no-underscore-dangle': ["error", { "allow": [ "__typename"] }]
  },
  ignorePatterns: ['.eslintrc.js', 'src/react-app-env.d.ts', 'src/config/reportWebVitals.ts', 'src/setupTests.ts'],
  overrides: [
    {
      "files": ["*.js", "*.mjs"],
      "rules": {
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ]
}
