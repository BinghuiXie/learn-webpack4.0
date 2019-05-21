webpack
----------------------------------
- 利用 npm 查看 webpack 某一个版本是否存在
    - npm info webpack
- webpack 是什么
    - 原始的网页开发
        html， css， js 文件
        js 逻辑都堆在一个文件中(面向过程)
        面向对象 => 代码更具有维护性，不同模块的逻辑封装到不同的对象(js文件，每一个文件处理一个模块的逻辑)中
            缺点 => 页面引入多个 js 文件导致页面加载变慢
                    如果文件之间有一定的关联的话，文件的引入顺序就要有一定的规定，引入顺序错误就会导致很隐蔽的错误 => 文件之间的依赖关系非常明确
    - 一定的解决方案 (ES Moudule 模块引入方式)
        import 在一个文件中引入对应的模块，最后再将这个引入了多个模块的文件引入页面中，这样做的话，有以下几个优点
            - 优点
                - 文件路径可以一眼看出来
                - 降低了文件之间的依赖关系
                - 页面值引入一个 js 文件提高加载速度
            - 缺点
                原生浏览器不认识 import 语句是什么意思
    - webpack 登场
        简单来说，可以把 import 语句翻译一下，这样浏览器就认识这个语法了
        - 安装 webpack (webpack-cli 的作用使得可以在命令行里面使用 webpack 进行打包)
            **npm install webpack-cli --save-dev** (webpack-cli: the tool used to run webpack on the command line)
            **npm install webpack --save**
        - 翻译
            **npx webpack index.js** => 利用 webpack 翻译 index.js 文件
        - 定义
            **webpack is a module bundler.** => **模块( import 或者 CommonJs (通过 require 引入的),CMD, AMD 等 引入的模块)** 打包工具
                eg: import Header from '....' => Header 就是一个模块
                ES module 语法： import <===> export 
                CommonJS 语法： require <===> module.exports = foo (var foo = require('....') // 引入)
            - webpack 最初推出的时候只能打包 js 文件，但是发展到现在已经可以打包任何类型的文件了，比如说 png, jpg, svg等图片文件
                eot, ttf, woff, woff2 等字体文件， css, less, scss 等 css 文件等等
    - webpack 坏境配置 (起步: [https://webpack.js.org/guides/getting-started]())
        - 安装 node
        - **npm init** => 以 node 规范的形式创建一个项目或者 node 的包文件
            - 生成一个 package.json 文件
                - 修改配置
                    > We also need to adjust our package.json file in order to make sure we mark our package as private, as well as removing the main entry. This is to prevent an accidental publish of your code.
                    
                    添加 **"private": true** 表明这是一个私有项目
                    license 里面的 MIT 表示开源
        - 安装 webpack
            - 1. 全局安装 **npm install webpack webpack-cli -g** => 不推荐，因为不同的项目可能需要的 webpack 的版本不同
            - 2. 项目内安装 webpack
                **npm install webpack webpack-cli --save-dev** (--save-dev === -D)
                查看安装的 webpack 版本 => npx webpack -v (npx 会在 node_modules 里面找 webpack，就能打印出版本号了) 
        - 配置文件，进行打包
            - 新建 webpack.config.js 文件作为 webpack 的基础配置文件
                > A configuration file allows far more flexibility than simple CLI usage. We can specify loader rules, plugins, 
                resolve options and many other enhancements this way
            - 配置代码如下：
                ```javascript
                    const path = require('path');
                    
                    module.exports = {
                      mode: 'development',
                      // 项目做打包，从哪一个文件开始打包 (入口文件)
                      entry: './src/index.js',
                      // 打包文件输出配置
                      output: {
                        filename: 'bundle.js', // 输出的文件的名字
                        // 打包出的文件放到哪一个文件夹 ( dist ) 下面，值需要是一个绝对路径 __dirname => 指的是 webpack.config.js 所在的目录的这个路径
                        // __dirname 和 dist 进行一个结合
                        path: path.resolve(__dirname, 'dist')
                      }
                    };
                ```
            - 打包命令
                >  The npx command runs the webpack binary (./node_modules/.bin/webpack) of the webpack package we installed in the beginning
                
                **npx webpack**
                等价于 **npx webpack --config webpack.config.js** --config 后面表示配置文件，因为默认就是 webpack.config.js 文件，所以可以省略
            - 简化打包命令 (npm scripts)
                > Given it's not particularly fun to run a local copy of webpack from the CLI, we can set up a little shortcut. 
                  Let's adjust our package.json by adding an npm script
                在 package.json 文件中的 scripts 对象中添加
                    **"start": "webpack"**
                这样就可以通过 **npm run start** 进行打包了
                运行这一条命令的时候，会先在项目之中查找有没有 webpack ，有的话直接就打包，就不再去全局找 webpack 了
    - 什么是 Loader
        webpack 不能识别**非 js 后缀**的文件(模块) (当然不是只局限于 jpg 文件)
        loader 就是用来告诉 webpack 怎么配置这类文件 
        打包方案 => 告诉 webpack 针对不同类型的文件怎么进行打包
        - 配置
            ```
                module: {
                    // 模块配置规则, rules 是一个数组
                    rules: [{
                    // 打包格式为 jpg 的文件
                      test: /\.jpg$/,
                      use: {
                        loader: 'file-loader',
                        options: {},
                      }
                    }]
                  },
            ```
        - 使用 Loader 打包静态资源 (图片篇) **(file-loader url-loader)**
            - **file-loader打包篇**: [https://webpack.js.org/loaders/file-loader]()
              默认情况下打包出的图片的名字会变成一个随机生成的字符串 (9bd83ad1be94869690045c9b5b489f6d.jpg)
              如果想在打包过程中图片文件的名字不发生改变，需要进行一些配置
              ```
                // 额外的配置参数
                options: {
                  // 打包出来的文件的名字还是源文件名字 [name] ，后缀也是原文件后缀 [ext]
                  name: '[name].[ext]'
                }
              ```
              这种语法叫做 placeholder 也就是占位符，官网 [https://webpack.js.org/loaders/file-loader]() 上的解释有
              **[ext] : The file extension of the target file/resource.**
              **[name]: The basename of the file/resource.  Default: '[hash].[ext]'**
              **[hash]: Specifies the hash method to use for hashing the file content.**
              每一次进行打包，命令行里会有一些打包的信息，其中就有一个叫做 **Hash**
              ```
                Hash: 941bc60afdb4cb34d1c0 // Hash 是每次打包的一个相当于是标识符，类似于git commit 时生成的那个提交信息的head
                Version: webpack 4.31.0
                Time: 157ms
                Built at: 2019-05-19 16:45:42
                                                         Asset      Size  Chunks             Chunk Names
                                                     bundle.js  7.15 KiB    main  [emitted]  main
                jintaiyan_9bd83ad1be94869690045c9b5b489f6d.jpg   121 KiB          [emitted]
                Entrypoint main = bundle.js
                [./src/content.js] 200 bytes {main} [built]
                [./src/header.js] 194 bytes {main} [built]
                [./src/index.js] 373 bytes {main} [built]
                [./src/jintaiyan.jpg] 92 bytes {main} [built]
                [./src/sidebar.js] 200 bytes {main} [built]
              ```
                [hash] 就是这次打包生成和 Hash 值
              如果想要将所有的图片打包后都输出到一个文件夹中，可以进行如下配置
                ```
                    // 在 options 下面添加如下配置
                    // outputPath: Specify a filesystem path where the target file(s) will be placed
                    outputPath: 'images/'
                ```
            - **url-loader 打包篇** [https://webpack.js.org/loaders/url-loader]()
                配置大概一样，说一下区别
                    url-loader 打包的时候会把图片转化为一个 base64 的字符串，然后直接放到打包出来的 js 文件中，就不会生成一个放图片的文件夹，里面放了图片了
                    缺点： 如果图片很大，那么打包生成的 js 文件就很大，这样在加载到时候就会很慢
                    当然如果一个图片非常小，就可以用 url-loader 进行打包，这样这个小图片就不用再发一次 http 请求了
                    那么如何实现这样的配置呢，只需要加一个配置项
                    // 超过 2048 字节的图片会按照 file-loader 的形式进行打包(生成一个文件，把图片放进去), 如果小于 2048 字节(KB)，就生成一个 base64 的字符串
                    **limit: 2048**
                > limit:  A Number specifying the maximum size of a file in bytes. If the file is greater than the limit, file-loader is used by default and all query parameters are passed to it
        - 使用 Loader 打包静态资源 (样式篇) **(css-loader style-loader || CSS 预编译语言 sass, less, stylus 等)**
            - css-loader
                - 处理各个 css 文件的关系
                - 安装 **npm install css-loader -D**
                - 常用配置项
                    - importLoaders
                        ```
                            {
                                loader: 'css-loader', // translates CSS into CommonJS,
                                options: {
                                    importLoaders: 2
                                }
                            },
                        ```
                        里面 importLoaders 的意思
                        > The option importLoaders allows you to configure how many loaders before css-loader should be applied to @imported resources.
                        
                        在入口文件也就是 index.js 文件中引入了 'index.scss' 文件，这样的话，对 index.scss 文件的打包就会依次经过 postcss-loader, scss-loader, css-loader 和 style-loader,
                        但是如果在 index.scss 文件中通过 css 的引入语法 **@import** 引入了其他的 scss 文件，那么打包 index.scss 的时候遇到这一句再去打包 @import 引入的 scss 文件就可能不会按照
                        打包 index.scss 文件的顺序经过 4 个 loader， 而是会直接从 css-loader 开始打包，所以按照官方文档的说法， **importLoaders: 2** 的意思就是在 css-loader 打包之前先经过一下
                        css-loader 前 2 个 loader，在这里面就是 postcss-loader 和 sass-loader
                    - css module
                        - 什么是 css module： 
                            先来进行一个测试：在 src 下面新建一个 createAvatar.js 文件，在这个文件中写入以下代码(其实就是原 index.js 中创建一个 img 标签并添加一个类的代码)
                            ```javascript
                              import avatar from "./jintaiyan.jpg";
                              
                              function createAvatar() {
                                let img = new Image();
                                img.src = avatar;
                                img.classList.add('avatar');
                                let root = document.getElementById('root');
                                root.append(img);
                              }
                              
                              export default createAvatar;
                            ```
                            然后在 index.js 中引入 **import CreateAvatar from './createAvatar'**
                            index.js 中使用这个函数  **CreateAvatar()**
                            这样的话因为原来的 index.js 中也有一份一样的代码，所以就会创建两个一样的图片，而且通过浏览器的观察可以看出来，两个图片拥有一样的样式
                            这说明，index.js 中引入的 index.scss 同时影响到了两个通过不同方式创建的土拍你样式，这会导致一个问题：
                                现在的 index.scss 是全局引入，这样的话两种引入的 img 的样式都会受到影响，那么在实际开发中，可能修改一个样式文件导致出乎意料的样式变化，就是这个原因导致的
                                所以引入 **css模块化**
                        - css模块化: 当前 css 只对当前模块起作用，不会影响其他模块的样式
                        - 如何在 webpack 配置实现：
                            options: {
                              importLoaders: 2,
                              **modules: true** // 开启 css 的模块化打包
                            }
                            同样要修改引入的代码，之前是全局引入，就是直接 import './index.scss'
                            现在要这么干： **import style from './index.scss'** 同时把给 img 添加类的代码修改一下：原来是：**img.classList.add('avatar');**，修改后： **img.classList.add(style.avatar);**
                            现在再进行打包，就会发现只有一张图片 (直接在 index.js 创建的 img 标签有样式) 有添加的样式，另一张 (通过 import 引入的 img 没有样式) 没有样式，说明 css 模块化成功了
                            如果想让另一个也有样式，就需要在 **createAvatar.js** 中引入 index.scss，同时修改添加 img 类的代码由直接添加类变成添加模块里面的类，就可以了
                            
            - style-loader [https://webpack.js.org/loaders/style-loader]()
                > Adds CSS to the DOM by injecting a <style> tag => 把 css-loader 生成的样式挂载到页面的 head 部分 (head 标签内部)
                
                - 安装 **npm install style-loader -D**
            - sass-loader
                - 安装 **npm install sass-loader node-sass -D**
                - 配置
                    ```
                        {
                            test: /\.scss$/,
                            use: [
                              'style-loader', // creates style nodes from JS strings
                              'css-loader', // translates CSS into CommonJS
                              'sass-loader' // compiles Sass to CSS, using Node Sass by default
                              // webpack loader 的执行顺序是从下到上，从右到左，所以这样的配置打包 sass 文件的时候首先会利用 sass-loader 对 sass 代码进行一个翻译
                              翻译成 css 代码后给 css-loader， css-loader 执行好了以后给到 style-loader ，style-loader 将其挂载到 head 标签内
                            ]
                        }
                    ```
            - postcss-loader
                - 如果只是安装上面的几个 loader 的话，CSS3 的样式是不会添加厂商前缀的(webkit, moz...)，所以需要安装一个 postcss-loader
                - 安装: **npm i -D postcss-loader**
                - 用法
                    在与 webpack.config.js 同级的目录下面新建一个 postcss.config.js 文件
                    添加以下配置项
                        module.exports = {
                          plugins: [
                            require('autoprefixer')
                          ]
                        };
                    - 其中 autoprefixer 是一个插件，需要安装 **npm install autoprefixer -D**
        
        - 打包字体文件
            - 配置
                {
                    test: /\.(eot|ttf|woff|woff2|svg)$/,
                    use: {
                      loader: 'file-loader',
                    }
                }
    - 使用 plugins 使打包变得更快捷
        - **plugin 可以在 webpack 运行到某一个时刻(类似 vue 或者 react 的生命周期钩子)的时候，帮助做一些事情**
        - HtmlWebpackPlugin
            - 安装 ： **npm install --save-dev html-webpack-plugin**
            - 使用
                **plugins: [new HtmlWebpackPlugin()]** // 与 entry 同级的 plugins 配置
            - 作用
                会在**打包结束的这个时刻**自动生成一个 html 文件，并把打包生成的 js 自动引入到 html 中，但是默认不会生成一个 id 是 root 的 div 标签，
                所以需要配置一下：
                    plugins: [new HtmlWebpackPlugin({
                        template: 'src/index.html'
                    })]
                    template 就是提供一个 html 模板，webpack 会按照这个 html 模板的样子打包生成一个 html 文件
        - CleanWebpackPlugin
            - 安装：  **npm install clean-webpack-plugin -D**
            - 作用： 重新打包**之前**，可以帮我们自动的先删除 dist 文件夹，再打包的时候重新创建一个 dist 文件夹。这样就不会和之前的打包文件有冲突了
            - 配置： 
                `plugins: [new CleanWebpackPlugin()]`
    - SourceMap 的配置
        - 针对开发环境 (**mode: 'development'**)
            - sourceMap => dist 目录下 main.js 文件中比如说第 n 行出错，这个第 n 行的错误代码是写在 src 目录中，经过打包以后才到了 dist 目录下的 main.js 中
              sourceMap 在这里的作用就是： 它是一个映射关系，他知道 dist 目录下 main.js 第 n 行实际上对应的是 index.js 中对应的第 m 行，这样控制台报错的时候
              就会直接在源文件中告诉我们第 m 行出错了，而不是告诉我们在 main.js 中的第 n 行出错了，因为这样也不好定位错误，因为我们看代码错误，不是想看打包后的代码
              哪里错了，而是想看源代码哪里错了，source-map 在这里就是进行一个映射关系的
            - 配置：[https://webpack.js.org/configuration/devtool]()
                - **devtool: 'source-map', // source-map 映射** 
                    在与 entry 同级的地方添加配置
                    配置以后打包以后会生成一个 main.js.map 文件，表明映射关系
                - 同样可以这么进行配置：**devtool: 'inline-source-map'**
                    会把 main.js.map 通过 data-url 的方式直接写到打包后生成的 main.js 中 (作为一个 base64 的字符串放到了 main.js 的底部)
                - **cheap-inline-source-map:**
                    **devtool: 'cheap-inline-source-map'**
                    cheap-inline-source-map 里面这个 cheap 的意思解释如下：
                        如果代码量很大，那么单纯的 source-map 在检查报错的时候会精确到告诉我们哪一行的哪一个字符出了问题，实际上实际开发中我们只需要知道哪一行出了问题就行，而不需要知道这一行
                        的哪一个字符也出现了问题，所以加了这个 cheap 的作用就是只是帮我们把错误定位到行，不会去定位到列，这样可以提升打包的速度，同时，它只针对我们的业务代码，也就是源代码，对我们
                        引入的一些 loader， 库什么的不会去进行检查错误，如果想要去检查 loader 或者一些第三方模块的代码错误的话，可以看下面的这个配置
                - **cheap-module-(inline)-source-map**
                        根据上一个的解释，加了 module 以后就会去检查 loader 或者一些第三方模块的错误了
                - **devtool: 'eval'**
                    通过 eval 这种 js 的执行形式来生成 sourceMap 的对应关系，是打包速度最快，性能最好的一种配置
                    但是针对比较复杂的代码的这种情况，使用 eval 可能会导致报错不全面
            - 总结：
                前面说到的 **cheap**, **eval**, **module**, **inline**都是几个前缀，可以相互随意组合
                在开发环境中，推荐使用 **cheap-module-eval-source-map** => 提示错误全，打包速度较快
        - 针对线上环境 (**mode: 'production'**)
            - 配置： **devtool: 'cheap-module-source-map'**
    - WebpackDevServer [https://webpack.js.org/configuration/dev-server]()
        - 引言：
            - 在 package.json 中的 scripts 对象下面修改原来的 start 如下：
                ```
                    "scripts": {
                        - "start": "webpack"
                        + "watch": "webpack --watch"
                      },
                ```
                随后运行 **npm run watch**
                watch 的意思是会去监听文件的变化，文件变了的话就会自动进行一次打包，就不用每次修改以后都手动打包一次了
            - 增加需求
                - 需要打包完成的同时帮我们自动的打开浏览器，打开这个页面，不用我们手动打开
                - 添加一些服务器的特性
                这时仅仅依靠 watch 就不行了，就需要借用 **webpackDevServer**
        - 配置
            - 安装： **npm install webpack-dev-server -D**
            - 配置：
                - 在与 entry 同级的地方添加以下配置项
                    ```
                        devServer: {
                            // 服务器要启动在哪一个文件夹下
                            contentBase: './dist'
                          },
                    ```
                - 修改 package.json 中的 scripts，添加 **"start": "webpack-dev-server"**
        - 作用：Use webpack with a development server that provides live reloading. This should be used for **development** only.
            - 自动刷新浏览器
            - 文件发生变化自动重新打包 
            - 具有服务器的特性 (默认在 localhost:8000 启动一个服务)
        - 打包生成的文件不会放到 dist 文件夹里面，而是会放到内存里面，这样会提升打包速度
    - HMR (HotModuleReplacement) 热更新 [https://webpack.js.org/guides/hot-module-replacement]() [https://webpack.js.org/api/hot-module-replacement](API配置) [https://webpack.js.org/concepts/hot-module-replacement](实现原理)
        - 配置
            devServer: {
                hot: true,
                hotOnly: true
            }
            引入 webpack
                **const webpack = require('webpack');**
            使用插件
                plugins:[
                  **new webpack.HotModuleReplacementPlugin()**
                ]
        - 作用
            - css 中： 改了 css 样式文件，浏览器不会刷新重新加载页面，而是页面元素不变，页面元素上的样式发生改变
                至于 css 文件为什么不用写下面 js 类似的那一段代码是因为 css-loader 已经帮我们封装好了
            - js: 只会去更改与代码变更相关联的那一部分页面，其他的不动 (counter.js number.js index.js)，需要编写一段代码 (关键代码： **module.hot.accept**)
                ```javascript
                    // js 实现 hotModuleReplacement 的功能
                    if (module.hot) {
                      // 开启了 HMR 功能
                      // 如果 number 这个文件发生了变化，就执行后面的回调函数
                      module.hot.accept('./number', () => {
                        // 移除掉之前渲染的 number 函数，再重新渲染一下
                        document.body.removeChild(document.getElementById('number'));
                        number();
                      })
                    }
                ```
    
    - 使用 babel 编译 ES6 语法 [https://babeljs.io/]()   **babel 很重要，一定要去看看文档！！！！！！！！**
        - 安装： **npm install babel-loader @babel/core -D**
                **npm install @babel/preset-env --save-dev**
                **npm install @babel/polyfill -D**
        - 作用
            - **@babel/polyfill**
                babel只负责语法转换，比如将ES6的语法转换成ES5。但如果有些对象、方法，浏览器本身不支持，比如：
                    - 全局对象：Promise、WeakMap 等。
                    - 全局静态函数：Array.from、Object.assign 等。
                    - 实例方法：比如 Array.prototype.includes Array.map 等。
                此时，需要引入babel-polyfill来模拟实现这些对象、方法。
            - **babel/preset-env** => 会将 ES6 语法转为 ES5 语法，里面包含了而所有的 ES6 转换成 ES5 的规则
        - 配置
            ```
                {
                    test: /\.js$/,
                    exclude: /node_modules/, // 如果 js 文件在 node_modules 里面就不使用 babel-loader，因为 node_modules 里面的代码是第三方代码，没必要进行转义，因为已经转好了，所以只有文件不在 node_modules里面 babel-loader 才生效
                    loader: "babel-loader",
                    options: {
                      "presets": ["@babel/preset-env"]
                    }
                }
            ```
            在 src/index.js 文件中引入 babel-polyfill (这个和 **useBuiltIns: 'usage'** 有一个就可以)
                **import "@babel/polyfill";**
        - 优化
            - useBuiltIns
                添加 @babel/polyfill 以后，打包文件 main.js 由原来的 90 多KB 变成了将近 1000 KB，这是因为 @babel/polyfill 默认将所有的浏览器不支持的对象、方法(前面有提到)都自动做了实现
                但是在 index.js 中并没有用到那么多的对象和方法(只用了 Promise 和 map)，所以不需要全部都默认实现，只实现 Promise 和 map 就可以，这样就会减小打包后的 main.js 的大小，具体操作如下：
                   修改 babel 的 options 如下 
                   
                        options: {
                            // 中括号 "[]" 里面第一个参数是 preset 的名字，第二个参数是一些配置
                          "presets": [ **[** '@babel/preset-env', {
                            useBuiltIns: 'usage' // 根据业务代码，只把用到的 ES6 的新特性、对象、方法进行转义
                          } **]** ]
                        }
                    这样打包完成后的 main.js 变成了 228 KB
            - 针对浏览器
                options: {
                  "presets": [['@babel/preset-env', {
                    targets: {
                      edge: "17",
                      firefox: "60",
                      safari: "11.1",
                      chrome: "67" // 意思是 chrome 67, edge 17, firefox 60, safari 11.1 以上的版本浏览器自身已经支持 ES6 的一些语法了就没必要再用 babel 进行转义了
                    },
                    useBuiltIns: 'usage' // 根据业务代码，只把用到的 ES6 的新特性、对象、方法进行转义，这个其实和引入 babel-polyfill 是一样的，有一个就可以了
                  }]]
                }
                这样打包后 main.js 只是 92.3 KB 了
        - 库(组件)开发
            - 如果写的是业务代码，那么只需要引入 presets ，同时引入 babel-polyfill 就可以了， 如果写的是一个库项目的代码，需要进行下面的插件的安装配置
              这个插件的好处是可以有效的避免 polyfill 的一个问题：polyfill 会污染全局环境(在全局环境下创建一些变量，比如说 Promise 啥的)，而 plugin-transform-runtime 会以闭包的形式去引入内容，不存在全局环境的问题
            - 安装插件
                - **npm install --save-dev @babel/plugin-transform-runtime**
                - **npm install --save @babel/runtime**
                - **npm install --save @babel/runtime-corejs2**
            - 配置
                - options 下面添加如下配置
                {
                  "plugins": [
                    [
                      "@babel/plugin-transform-runtime",
                      {
                        "corejs": 2,
                        "helpers": true,
                        "regenerator": true,
                        "useESModules": false
                      }
                    ]
                  ]
                }
        - babel 的配置很多，当 options 里面的配置项变多是就会显得很冗杂，所以把这些配置项提取出来到 **.babelrc** 文件中, 原来的 options 选项就可以不用写了
    
    - 配置 React 代码的打包
        - 安装
            - **npm install --save-dev @babel/preset-react** => 解析 react 的 jsx 语法
        - 配置 
            - .babelrc 文件中 presets 添加项：(具体可见 .babelrc 文件)
                "@babel/preset-react"
                注意，presets 的执行顺序是从下到上，也就是先执行 preset-react，再执行 preset-env
                
    - Tree Shaking
        - 理解
            可以把每一个模块理解成一个树结构，比如说引入这个模块，只是引入了这个模块里面的一部分内容，那些没有被引入的可以通过 Tree Shaking 被“摇晃下去”，就不会被打包了，免得做无用功
            把一个模块里面没有用的东西都去掉，在这个例子(index.js math.js)中，只引入了 add 方法，而 minus 方法没有引入，但是默认也会打包，那么 Tree shaking 就可以把这个没有用到的 minus "摇晃掉"，不让他被打包
            **只支持 ES Module 的引入方法也就是 import引入**
            只要通过 import 引入了一个模块(不管是 css 还是 js 还是 vue，react 的组件什么的)，Tree Shaking 就会去看我们引入了什么，导出了什么，如果没用的 Tree Shaking 就不会对它进行打包
            但是在一些场景下，我们需要通过 import 引入一些样式(css)文件，而这些 css 文件显然是没有任何导出的，那么这时 Tree Shaking 就不会把这个 css 文件打包进去，我们就不会看到样式效果，会造成问题
            针对这类起作用但是没有一些导出什么的模块，需要在 package.json 中对其进行一些配置，详细看下面
        - 配置
            - 首先 development 模式下默认是没有 tree shaking 的，需要手动配置
            - 配置 (**development mode**)
                - webpack.config.js 
                    在与 entry 同级的地方加入配置项
                        optimization: {
                            usedExports: true // 哪些导出的模块被使用了，再进行打包
                        }
                - package.json
                    添加 **"sideEffects": false,** // Tree Shaking 正常对所有的模块都进行 tree shaking 的处理
                    (上面写到有的模块有用但是没有导出什么的所以会被 Tree Shaking 忽略不去打包，但这个实际上是有用的，这样情况可以这么配置
                        "sideEffects": ["*.css"], // 在这个数组里面写的文件都会被打包，而且 Tree Shaking 就不会对这些文件进行处理了， *.css 的意思是所有的 css 文件都不经过 Tree Shaking，直接打包
                    )
        - 注意，在 development 环境下，就算使用了 Tree Shaking 也不会把没有用到的代码从打包文件中去除，也就是说没有用到的模块也会打包，**但是**，会在代码里提示我们哪一个模块被**用到**
            ```javascript
                /*! exports provided: add, minus */ /* add  minus 都被打包进来 */
                /*! exports used: add */ /* 提示，只有 add 被使用 */
            ```
            之所以这么做，是因为在开发环境下有的代码要进行调试，如果被 Tree Shaking 删了，有可能就不对了，尤其是对 sourceMap
            在 production 环境下(需要上线的代码)，Tree Shaking 就会按照上面说的走
            在 production 环境下我们可以不写 webpack.config.js 里面的 **optimization: { usedExports: true // 哪些导出的模块被使用了，再进行打包 }** 可以不写，会自动的配置好
    - development 和 production 模式的区分打包
        - 开发的时候一般使用 development 模式 
        - 代码打包上线使用 production 模式
        - 区别
            - source
            Map => 开发模式下的 sourceMap 很全，可以方便的定位的代码的问题，在上线环境下，sourceMap 就不是那么重要了，就会简洁一些
            - 开发环境下打包代码CleanWebpackPlugin一般不压缩，上线代码是需要打包的时候需要被压缩
            - development 模式下的 devtool 最好改为 "cheap-module-eval-source-map"，还有需要添加 **optimization: { usedExports: true }** 以使用 Tree Shaking 
              production 模式下的 mode 改为 production， devtool 改为 "cheap-module-source-map"，可以去掉 **optimization: { usedExports: true }**
              **所以在切换开发环境和线上环境的时候需要不停的手动修改 webpack.config.js 显得比较麻烦**
        - 操作
            - webpack.config.js 修改为 **webpack.dev.js**，表示是开发环境下的配置文件
            - 创建 **webpack.prod.js** 表示线上模式的时候使用的是这个配置文件, 把 webpack.dev.js 里面的内容复制进去并进行线上模式对应的修改
                - **mode: 'production',**
                - **devtool: 'cheap-module-source-map'**
                - 去掉 devServer
                - 去掉 **new webpack.HotModuleReplacementPlugin()** 不需要 HMR
                - 去掉 optimization
            - 优化 package.json 如下
                - **"dev": "webpack-dev-server --config webpack.dev.js",** // 开发模式运行 webpack.dev.js 文件的规则进行打包，打包命令 npm run dev || yarn dev
                - **"build": "webpack --config webpack.prod.js",** // 线上模式运行 webpack.prod.js 文件的规则进行打包，打包命令 npm run dev || yarn dev
        - 提取代码
            - webpack.dev.js 和 webpack.prod.js 里面的代码有很多一样的，所以可以提取出来到一个公共的文件中
            - 新建 webpack.common.js 作为公共代码放置的文件
            - 安装  **npm install webpack-merge -D** (第三方库，可以用于合并不同文件的配置)
            - 合并配置 (具体可见各个文件)
                引入
                    const merge = require('webpack-merge');
                    const commonConfig = require('./webpack.common');
                导出
                    module.exports = merge(commonConfig, devConfig); // 合并基础配置和 **开发 || 线上** 配置
            - 最后新建一个 build 文件夹把几个配置文件放进去，再修改 package.json 文件如下
                - **"dev": "webpack-dev-server --config ./build/webpack.dev.js",**
                - **"build": "webpack --config ./build/webpack.prod.js",** 
        - 问题
            - 打包的时候遇到了一个问题，打包生成的 dist 文件夹跑到了 build 文件夹下面
            - 分析
                因为把三个配置文件都放到了 build 文件夹下面，所以 output 选项里面的 **__dirname** 此时就是 **E:\path\path\path\path\build**，
                而且原来的 output 的path 配置是 **path: path.resolve(__dirname, 'dist')** 也就是输出文件夹 dist 是在 __dirname 下面，在
                没有把配置文件放到 build 里面的时候 __dirname 是根目录还好说，但是放进去以后路径多了一个 build ，所以就会在 build 下面生成 dist
                所以修改成 **path: path.resolve(__dirname, '../dist')** 合并的时候跳过 build 往上找一层找到根目录再合并，就解决了
                (具体可以运行目录下面的 path.js 文件看看 __dirname 和 path.resolve 的结合方式)
                
    - webpack 和 code splitting (代码分割)
        - 安装一个包  **npm install lodash --save**
        - 默认情况下所有的业务代码都会被打包放到 main.js 中
          举个例子，在业务代码(index.js)中引入 lodash，如果说引入的 lodash 模块的大小是 1MB，业务逻辑代码非常多也有 1MB，这样生成的 main.js 文件至少有 2MB，这样带来的问题有
            - 打包文件很大，加载时间很长
            - 每次重新打包生成的 main.js 都是 2MB，这样用户每次访问页面，就又要加载 2MB 的内容
        - 拆分代码 (code splitting) **(手动实现代码分割)**
              main.js 被拆成 lodash.js 和 main.js(现在里面只有业务代码) 大小都是 1MB，在 lodash.js 中引入 lodash，并将变量挂载到全局环境下
              并在 webpack.common.js 文件的 entry 中添加另一个文件入口 **lodash: './src/lodash.js',** 这样有关 lodash 的代码会另外打包到一个文件中
              现在用户第一次浏览页面就是直接去加载两个 1MB 的文件，因为浏览器是可以并行加载的，这样的话同时加载两个 1MB 文件会比加载一个 2MB 文件快一点
              而且还有一个好处就是修改了业务代码，用户重新访问页面的时候只需要加载 main.js 即可，因为 lodash.js 在缓存里面已经有了，就不需要重新加载
              所以重新访问的话，这样子就可以提高加载速度了，因为相比之前的每次加载 2MB 的代码，现在只需要加载 1MB 即可
        - 借助 webpack 帮助实现 code splitting
            在 webpack.common.js 中添加配置
              **optimization: {
                    splitChunks: {
                      chunks: 'all'
                    }
                }**
            遇到公用的类库的时候，会把共用的类库放到一个文件(vendors~main.js)，业务代码打包到一个文件 ，自动的分开进行打包
            这样的话也不需要手动的把类库的引入和业务代码分开到不同的文件里面写了，写到一个文件里面，webpack 会自动分开进行打包
        - 另一种方式实现代码分割
            异步引入模块
                听不懂--、
        - 总结
            - 代码分割 和 webpack 无关 只是一种提高性能的方式
            - webpack 中实现代码分割两种方式
                - 同步代码 => 只需要在 webpack.common.js 中做 optimization 的而配置
                - 异步代码 => 无需做任何配置，会自动进行代码分割
        - 关于 **SplitChunksPlugin** 的配置参数可以见官方文档 [https://webpack.js.org/plugins/split-chunks-plugin]()
                // 一些该插件的配置参数
                **optimization**: { // https://webpack.js.org/plugins/split-chunks-plugin
                    **splitChunks**: {
                      // 同步代码逻辑
                      **chunks**: 'all',
                      **minSize**: 30000, // 只有大于 30KB 的时候才进行代码分割
                      **minChunks**: 1, // 打包后生成的 Chunks (js 文件) 中至少将一个模块引用了多少次才会被分割
                      **maxAsyncRequests**: 5, // 最多同时加载的模块数的个数，如果同时加载 10 个，那么前 5 个会被分割，超过的 5 个就不会进行代码分割
                      **maxInitialRequests**: 3, // 入口文件引入的库做代码分割，最多只能分割 3 个文件出来，再多的引入就不分割了
                      **automaticNameDelimiter**: '~', // 组和文件名之间的连接符
                      **name**: true, // cacheGroups 里面的名字会生效
                      **cacheGroups**: {
                        **vendors**: {
                          // 如果满足上面的几个条件 (minSize minChunks maxAsyncRequests 等)，那么就会进行代码分割，然后如果是从 node_modules 里面引入的话就会分割到 vendor.js 中
                          **test**: /[\\/]node_modules[\\/]/,
                          **priority**: -10, // 值越大，优先级越高，那么模块就会被打包到优先级高的里面去 (-10 的优先级大于 default 的-20)，所以既满足 vendors 也满足 default 的会优先被打包到 vendors 下面的 vendor.js 中
                          **filename**: 'vendor.js'
                        },
                        // 默认情况 （所有的模块都符合，因为根本就没有 test ）下会分割到哪一个文件中
                        **default**: {
                          **priority**: -20,
                          **reuseExistingChunk**: true, // 如果一个模块已经被打包过，那么不会进行重新打包，直接复用就可以
                          **filename**: 'common.js'
                        }
                      }
                    }
                  },
    - Lazy Loading 懒加载
        通过 import 去异步的引入一个模块
        什么时候执行加载一个模块的代码，再加载这个模块
        比如说用 vue 或者 react 写代码的时候，浏览首页的时候只加载首页的代码，什么列表页，详情页的代码都不加载，只有当路由切换的时候，才会去加载路由跳转到的页面，把每个页面做一个分割
        这个路由跳转就是一个懒加载的触发条件，就是一开始路由不匹配的时候不加载对应的租件，只有路由匹配了才加载对应的组建
    - Chunk 是什么
        - 打包过程中生成的 js 文件都叫做一个 Chunk
    - CSS 文件代码的分割 (**MiniCssExtractPlugin**) [https://webpack.js.org/plugins/mini-css-extract-plugin]()
        - webpack 在打包 css 文件时，会直接将 css 代码打包到 js 文件中，不会单独打包出 css 文件，这就是 css in js
        - 借助插件把 css 单独打包到 css 文件中
        - 安装：
            - **npm install --save-dev mini-css-extract-plugin**
        - 使用
            - 引入(webpack.prod.js)： **const MiniCssExtractPlugin = require('mini-css-extract-plugin');**
            - 使用：先在 plugins 配置 **new MiniCssExtractPlugin()**
                   根据官方文档，需要把 css 相关的文件(css, scss,less等)的 style-loader 换成 MiniCssExtractPlugin 提供的 loader
                    {
                        test: /\.css$/,
                        use: [
                          {
                            // 原 style-loader 替换为插件提供的 loader
                            **loader: MiniCssExtractPlugin.loader**
                          },
                          'css-loader',
                        ],
                    },
        - 生成的 css 文件做一下代码压缩 **(只针对生产环境(production))**
            - 安装插件 
                **npm install --save-dev optimize-css-assets-webpack-plugin**
                **npm install --save-dev terser-webpack-plugin**
            - 引入插件 (webpack.prod.js) 
                **const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');**
                **const TerserJSPlugin = require('terser-webpack-plugin');**
            - 使用插件： 在 optimization 中添加项： **minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],**
            - 运行 **npm run build** 进行线上环境的打包
        - 剩下的配置可以看官方文档
        
                 
                
                        
            
            