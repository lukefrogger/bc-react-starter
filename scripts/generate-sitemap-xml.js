const path = require('path')
const fs = require('fs')
const rootPath = path.join(__dirname, '../src/')
const { createMatchPath, loadConfig } = require('tsconfig-paths')
const {
  resolvePath: defaultResolvePath,
} = require('babel-plugin-module-resolver')

const configLoaderResult = loadConfig()
const dotenv = require('dotenv')
const extensions = ['.js', '.jsx', '.ts', '.tsx']

const matchPath = createMatchPath(
  configLoaderResult.absoluteBaseUrl,
  configLoaderResult.paths
)

dotenv.config()
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
const dom = new JSDOM('<!doctype html><html><body></body></html>')

window = dom.window
document = dom.window.document
const root = document.createElement('div')
root.setAttribute('id', 'root')
document.body.appendChild(root)
navigator = dom.window.navigator
CustomEvent = dom.window.CustomEvent

require.extensions['.css'] = () => {}
require.extensions['.scss'] = () => {}

require('../src/sitemap-xml')
