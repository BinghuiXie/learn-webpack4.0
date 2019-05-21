// it is a core Node.js module that gets used to manipulate file paths.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');
const commonConfig = {
  // entry => 项目做打包，从哪一个文件开始打包
  // 这样写与 entry : './src/index.js' 的效果是一样的
  entry: {
    // lodash: './src/lodash.js',
    main: './src/index.js',
    // sub: './src/index.js'
  },
  module: {
    // 模块配置规则, rules 是一个数组
    rules: [
      {
        test: require.resolve('../src/globals.js'),
        loader: 'exports-loader?file,parse=helpers.parse'
      }, {
        test: /\.(jpg|png|gif)$/,
        use: {
          // 遇到 jpg 文件的时候使用 file-loader 这个 loader 对文件进行打包
          loader: 'url-loader'/*'file-loader'*/,
          // 额外的配置参数
          options: {
            // 打包出来的文件的名字还是源文件名字 [name] ，后缀也是原文件后缀 [ext]
            // placeholder 占位符
            name: '[name]_[hash].[ext]',
            // Specify a filesystem path where the target file(s) will be placed. => 打包生成的图片文件会被放到这个 images 文件夹下面
            outputPath: 'images/',
            limit: 2048, // 小于 2048 B，就会以 base64 的形式放到代码里，可以提升网页加载速度
            emitFile: true
          }
        }
      }, {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }
      }, {
        test: /\.js$/,
        exclude: /node_modules/, // 如果 js 文件在 node_modules 里面就不使用 babel-loader，因为 node_modules 里面的代码是第三方代码，没必要进行转义，因为已经转好了，所以只有文件在 src 下面 babel-loader 才生效
        use: [
          // {
          //   loader: 'imports-loader?this=>window'
          // },
          {
            loader: 'babel-loader'
          }
        ]
        // 这些配置已经移动到了 .babelrc 文件中
        // options: {
        //   "presets": [['@babel/preset-env', {
        //     targets: {
        //       chrome: "67" // 意思是 chrome 67 以上的版本浏览器自身已经支持 ES6 的一些语法了就没必要再用 babel 进行转义了
        //     },
        //     useBuiltIns: 'usage' // 根据业务代码，只把用到的 ES6 的新特性、对象、方法进行转义
        //   }]],
        //   "plugins": [
        //     [
        //       "@babel/plugin-transform-runtime",
        //       {
        //         "corejs": false,
        //         "helpers": true,
        //         "regenerator": true,
        //         "useESModules": false
        //       }
        //     ]
        //   ]
        // }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    // ProvidePlugin [https://www.webpackjs.com/plugins/provide-plugin/]() 自动加载模块，不用 import 或者 require
    new webpack.ProvidePlugin({ // 当检测到一个模块里面使用了 $ 或者 _ 这个字符串，就会自动的帮助我们引入 jQuery (或者 lodash )，然后把 jQuery (lodash) 赋值给 $ (_) 这个变量，就类似与在模块顶部写一个 import $ (_) from 'jquery'('lodash')
      $: 'jquery',
      _join: ['lodash', 'join']
    })
    // 线上 production 不需要
    // new webpack.HotModuleReplacementPlugin()
  ],
  optimization: { // https://webpack.js.org/plugins/split-chunks-plugin
    usedExports: true, // 哪些导出的模块被使用了，再进行打包 Tree Shaking
    splitChunks: {
      // 同步代码逻辑
      chunks: 'all', // 对同步和异步的代码都进行分割
      minSize: 30000, // 只有大于 30KB 的时候才进行代码分割
      minChunks: 1, // 打包后生成的 Chunks (js 文件) 中至少将一个模块引用了多少次才会被分割
      maxAsyncRequests: 5, // 最多同时加载的模块数的个数，如果同时加载 10 个，那么前 5 个会被分割，超过的 5 个就不会进行代码分割
      maxInitialRequests: 3, // 入口文件引入的库做代码分割，最多只能分割 3 个文件出来，再多的引入就不分割了
      automaticNameDelimiter: '~', // 组和文件名之间的连接符
      name: true, // cacheGroups 里面的名字会生效
      cacheGroups: {
        vendors: {
          // 如果满足上面的几个条件 (minSize minChunks maxAsyncRequests 等)，那么就会进行代码分割，然后如果是从 node_modules 里面引入的话就会分割到 vendor.js 中
          test: /[\\/]node_modules[\\/]/,
          priority: -10, // 值越大，优先级越高，那么模块就会被打包到优先级高的里面去 (-10 的优先级大于 default 的-20)，所以既满足 vendors 也满足 default 的会优先被打包到 vendors 下面的 vendor.js 中
          filename: 'vendor.js'
        },
        // 默认情况 （所有的模块都符合，因为根本就没有 test ）下会分割到哪一个文件中
        default: {
          priority: -20,
          reuseExistingChunk: true, // 如果一个模块已经被打包过，那么不会进行重新打包，直接复用就可以
          filename: 'common.js'
        }
      }
    }
  },
  output: {
    filename: '[name].js', // 默认是 main.js   [name] 就是指的 entry 中的 main 和 sub, 会打包两次， 会生成一个 main.js, 一个 sub.js，同样在 index.html 中会将两个 js 文件都引入
    // 打包出的文件放到哪一个文件夹 ( dist ) 下面，值需要是一个绝对路径 __dirname => 指的是 webpack.config.js 所在的目录的这个路径
    // __dirname 和 dist 进行一个结合
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].chunk.js'
  },
};

// 函数
module.exports = (env) => {
  if (env && env.production) {
    // 线上环境
    return merge(commonConfig, prodConfig)
  } else {
    // 开发环境
    return merge(commonConfig, devConfig)
  }
};