// 生产环境移除console
// if (process.env.NODE_ENV === 'production') {
//   plugins.push('transform-remove-console')
// }
module.exports = {
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => `${name}/style/less`
        // style: true
      },
      'vant'
    ]
  ],
  presets: [
    [
      '@vue/app',
      {
        modules: false,
        polyfills: ['es6.promise', 'es6.symbol'],
        useBuiltIns: 'entry'
      }
    ]
  ]
}
