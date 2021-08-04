process.env.VUE_APP_TITLE = require('./package.json').name
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = process.env.VUE_APP_TITLE || 'Vant-App-Template'
console.log(name, process.env.VUE_APP_TITLE)
module.exports = {
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV === 'development',
  devServer: {
    host: 'localhost',
    port: 9600,
    https: false,
    open: true,
    disableHostCheck: true
  },
  // parallel: require('os').cpus().length > 1,
  // configureWebpack: {
  //webpack的相关配置在这里
  // plugins: plugins,
  // },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV !== 'development',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
          hack: `true; @import '/src/style/var.less'`
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: {
      AMap: 'AMap' // 高德地图配置
    }
  },
  // 是一个函数，允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: config => {
    // 配置别名
    config.resolve.alias.set('@', resolve('src'))
    // 去除生产环境console
    // npm install terser-webpack-plugin -D
    // if (process.env.NODE_ENV === 'production') {
    //   config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    // }

    config.optimization.minimizer('terser').tap(args => {
      args[0].terserOptions.compress.drop_console = true
      return args
    })

    // 代码分析
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/style/minix.less')]
    }
  }
}
