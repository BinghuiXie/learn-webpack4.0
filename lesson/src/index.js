import { file, parse } from './globals.js';
// import $ from 'jquery'
// import _ from 'lodash'
// import { ui } from './jquery.ui'
// 入口文件
// 如果编写一个库的话可以把这行注释掉，业务代码可以添加 babel-polyfill
// import "@babel/polyfill"; // 这个和 useBuiltIns: 'usage' 有一个就可以
// import Header from './header'
// import SideBar from './sidebar'
// import Content from './content'
// import CreateAvatar from './createAvatar'
// import style from './index.scss'
// import avatar from "./jintaiyan.jpg";
// import './iconfont.css'
// import './style.css'
// import counter from './counter'
// import number from './number'
//
// counter();
// number();
//
// // js 实现 hotModuleReplacement 的功能
// if (module.hot) {
//   // 开启了 HMR 功能
//   // 如果 number 这个文件发生了变化，就执行后面的回调函数
//   module.hot.accept('./number', () => {
//     // 移除掉之前渲染的 number 函数，再重新渲染一下
//     document.body.removeChild(document.getElementById('number'));
//     number();
//   })
// }

//
// CreateAvatar();
//
// new Header();
// new SideBar();
// new Content();
//
// let img = new Image();
// img.src = avatar;
// img.classList.add(style.avatar);
// let root = document.getElementById('root');
// root.append(img);
//
// let dom = document.createElement('div');
// dom.classList.add('iconfont', 'icon-webpack');
// root.append(dom);
//
// var button = document.createElement('button');
// document.body.appendChild(button);
// button.innerHTML = '新增';
// button.onclick = function () {
//   var div = document.createElement('div');
//   div.innerHTML = 'item';
//   document.body.appendChild(div);
// };

// babel 转 es6
// const arr = [
//   new Promise(() => {}),
//   new Promise(() => {})
// ];
// arr.map((item) => {
//   console.log(item);
// });

// react
// import React from 'react'
// import ReactDom from 'react-dom'
//
// class App extends React.Component{
//   render () {
//     return (
//       <div>Hello World</div>
//     )
//   }
// }
//
// ReactDom.render(
//   <App />,
//   document.getElementById("root")
// );


// tree shaking
// 把一个模块里面没有用的东西都去掉，在这个例子中，只引入了 add 方法，而 minus 方法没有引入但是默认也会打包，那么 Tree shaking 就可以把这个没有用到的 miuns "摇晃掉"，不让他被打包
// 可以把每一个模块理解成一个树结构，比如说我引入这个模块，只是引入了这个模块里面的一部分内容，那些没有被引入的可以通过 Tree Shaking 被“摇晃下去”，就不会被打包了，免得做无用功
// 只支持 ES Module 的引入方法也就是 import引入
// import { add } from './math'
// add(1, 6);

// code splitting
// import _ from "lodash"; // 写在这里 利用 webpack 帮助我们进行代码分割
// import test from './test'
//
// console.log(test.name);
//
// console.log(_.join(['a', 'b', 'c'], '***')); // 字符串连接函数 打印出：a***b***c
//
// // 异步加载 lodash
// function getComponent() {
//   return import('lodash').then(({ default: _ }) => {
//     var element = document.createElement('div');
//     element.innerHTML = _.join(['Dell', 'Lee'], '-');
//     return element;
//   })
// }
// document.addEventListener('click', () => {
//   getComponent().then(element => {
//     document.body.appendChild(element)
//   });
// });
//
// css code splitting
// import './style.css'

// ui();
//
// const dom = $('<div>');
// dom.html(_.join(['Tiki', 'Taka'], '-'));
// $('body').append(dom);

console.log(this);

console.log(file);
parse();