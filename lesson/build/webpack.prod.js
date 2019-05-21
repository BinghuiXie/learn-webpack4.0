const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
  // 打包模式，默认是 production
  // production 模式下打包出来的文件是一个压缩过的文件， development 模式打包出来的就是一个没有压缩过的文件
  mode: 'production',
  devtool: 'cheap-module-eval-source-map', // 针对 development 环境
  // cheap => 生成 sourceMap 的时候不需要带列信息，同时不去关注 loader 里面的代码
  // module => 对 loader 里面的代码也生成一个 sourceMap
  // devtool: 'cheap-module-source-map', // 针对 production 环境
};

module.exports = merge(commonConfig, prodConfig);