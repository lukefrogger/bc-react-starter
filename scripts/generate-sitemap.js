const webpack = require('webpack')
const path = require('path')

const compiler = webpack({
  //   entry: './src/utils/save-sitemap-xml.ts',
  entry: path.resolve(__dirname, 'src/utils/save-sitemap-xml.ts'),
  output: {
    // path: path.resolve(__dirname, 'build/static/js'),
    filename: 'save-sitemap-xml.js',
  },
})

compiler.run((err, stats) => {
  if (err) {
    throw Error(err)
  }

  console.log(path.resolve('src/utils/save-sitemap-xml.ts'))
  console.log(path.resolve(__dirname, 'build/static/js'))
})
