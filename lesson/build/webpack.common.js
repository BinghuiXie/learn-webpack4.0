// it is a core Node.js module that gets used to manipulate file paths.
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // entry => 项目做打包，从哪一个文件开始打包
  // 这样写与 entry : './src/index.js' 的效果是一样的
  entry: {
    main: './src/index.js',
    // sub: './src/index.js'
  },
  module: {
    // 模块配置规则, rules 是一个数组
    rules: [
      {
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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
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
        loader: 'babel-loader'
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
    // 线上 production 不需要
    // new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: '[name].js', // 默认是 main.js   [name] 就是指的 entry 中的 main 和 sub, 会打包两次， 会生成一个 main.js, 一个 sub.js，同样在 index.html 中会将两个 js 文件都引入
    // 打包出的文件放到哪一个文件夹 ( dist ) 下面，值需要是一个绝对路径 __dirname => 指的是 webpack.config.js 所在的目录的这个路径
    // __dirname 和 dist 进行一个结合
    path: path.resolve(__dirname, '../dist')
  },
};