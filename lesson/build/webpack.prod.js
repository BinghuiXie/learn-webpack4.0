// const merge = require('webpack-merge');
// const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const prodConfig = {
  // 打包模式，默认是 production
  // production 模式下打包出来的文件是一个压缩过的文件， development 模式打包出来的就是一个没有压缩过的文件
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }, {
        test: /\.scss$/,
        use: [
          // 'style-loader', // creates style nodes from JS strings
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS,
            options: {
              importLoaders: 2,
              modules: true
            }
          },
          'sass-loader', // compiles Sass to CSS, using Node Sass by default
          'postcss-loader' // 帮助添加 css 厂商前缀
        ]
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map', // 针对 development 环境
  // cheap => 生成 sourceMap 的时候不需要带列信息，同时不去关注 loader 里面的代码
  // module => 对 loader 里面的代码也生成一个 sourceMap
  // devtool: 'cheap-module-source-map', // 针对 production 环境
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // 如果打包后的文件会直接被引用在 index.html 中，那么就会走这个 filename 的配置项
      chunkFilename: '[name].chunk.css' // 如果是简介引用的话(比如说在一个直接引用的文件中引用了另一个文件)那么就会走这个 chunkFilename 的配置项
    })
  ]
};

// module.exports = merge(commonConfig, prodConfig);
module.exports = prodConfig;