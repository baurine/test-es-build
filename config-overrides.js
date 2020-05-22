const {
  override,
  addBundleVisualizer,
  addWebpackPlugin,
} = require('customize-cra')
const { ESBuildPlugin } = require('esbuild-loader')

const useEsBuild = () => (config) => {
  const rules = config.module.rules.find((rule) => Array.isArray(rule.oneOf))
    .oneOf
  const jsRule = rules.find(
    (rule) =>
      rule.loader &&
      rule.loader.endsWith('babel-loader/lib/index.js') &&
      rule.include
  )
  if (jsRule) {
    jsRule.loader = 'esbuild-loader'
    jsRule.options = {
      // ...jsRule.options,
      // All options are optional
      target: 'es2015', // default, or 'es20XX', 'esnext'
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      sourceMap: false, // Enable sourcemap
    }
    addWebpackPlugin(new ESBuildPlugin())(config)
  }

  return config
}

module.exports = override(
  // addBundleVisualizer(),
  useEsBuild(),
)
