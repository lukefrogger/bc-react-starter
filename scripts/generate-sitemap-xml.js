const path = require('path')
const fs = require('fs')
const rootPath = path.join(__dirname, '../src/')
const { createMatchPath, loadConfig } = require('tsconfig-paths')
const {
  resolvePath: defaultResolvePath,
} = require('babel-plugin-module-resolver')

const configLoaderResult = loadConfig()

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const matchPath = createMatchPath(
  configLoaderResult.absoluteBaseUrl,
  configLoaderResult.paths
)

require('@babel/register')({
  root: rootPath,
  presets: [
    [
      '@babel/preset-react',
      { runtime: 'automatic', importSource: '@emotion/react' },
    ],
    '@babel/preset-typescript',
    '@babel/preset-env',
  ],
  extensions,
  plugins: [
    '@babel/transform-runtime',
    '@emotion/babel-plugin',
    [
      'module-resolver',
      {
        extensions,
        resolvePath: (sourcePath, currentFile, opts) => {
          try {
            return matchPath(sourcePath, require, fs.existsSync, extensions)
          } catch (err) {
            return defaultResolvePath(sourcePath, currentFile, opts)
          }
        },
      },
    ],
  ],
  ignore: [/node_modules/],
  cache: false,
})

const jsdom = require('jsdom')
const { JSDOM } = jsdom
const dom = new JSDOM()

window = dom.window
document = dom.window.document
navigator = dom.window.navigator
CustomEvent = dom.window.CustomEvent

require.extensions['.css'] = () => {}
require.extensions['.scss'] = () => {}

// const Sitemap = require('../src/pages/sitemap').Sitemap

// console.log(RootRoutes())
const { RootRoutes } = require('../src/routers/routes')

require('react-dom');
window.React2 = require('react');

console.log(window.React1 === window.React2);
// const test = require('../src/sitemap-xml')

// console.log(router)
