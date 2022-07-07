import { nodeResolve } from '@rollup/plugin-node-resolve'
import excludeDependenciesFromBundle from 'rollup-plugin-exclude-dependencies-from-bundle'

export default {
  input: 'server/app.js',
  output: {
    file: 'netlify/functions/app.js',
    format: 'cjs',
  },
  plugins: [nodeResolve(), excludeDependenciesFromBundle()],
}
