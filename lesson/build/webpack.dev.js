// module, entry , 一些公用插件, output 等公共模块都已经提取到 webpack.common.js 中
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const devConfig = {
  // 打包模式，默认是 production
  // production 模式下打包出来的文件是一个压缩过的文件， development 模式打包出来的就是一个没有压缩过的文件
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // 针对 development 环境
  // cheap => 生成 sourceMap 的时候不需要带列信息，同时不去关注 loader 里面的代码
  // module => 对 loader 里面的代码也生成一个 sourceMap
  // devtool: 'cheap-module-source-map', // 针对 production 环境
  // webpack-dev-server
  devServer: {
    // 服务器要启动在哪一个文件夹下
    contentBase: './dist',
    open: true, // 在启动的时候打开浏览器，自动访问启动的地址
    port: 8080, // 端口号
    hot: true, // HotMapReplacement => HMR 热更新
    // hotOnly: true // 即使 HMR 有问题，也不会重新刷新浏览器
  },
  plugins: [
    //
    // new HtmlWebpackPlugin({
    //   template: 'src/index.html'
    // }),
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true // 哪些导出的模块被使用了，再进行打包
  }
};

module.exports = merge(commonConfig, devConfig);