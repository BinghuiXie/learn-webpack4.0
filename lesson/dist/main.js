!function(n){var c={};function e(l){if(c[l])return c[l].exports;var t=c[l]={i:l,l:!1,exports:{}};return n[l].call(t.exports,t,t.exports,e),t.l=!0,t.exports}e.m=n,e.c=c,e.d=function(n,c,l){e.o(n,c)||Object.defineProperty(n,c,{enumerable:!0,get:l})},e.r=function(n){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},e.t=function(n,c){if(1&c&&(n=e(n)),8&c)return n;if(4&c&&"object"==typeof n&&n&&n.__esModule)return n;var l=Object.create(null);if(e.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:n}),2&c&&"string"!=typeof n)for(var t in n)e.d(l,t,function(c){return n[c]}.bind(null,t));return l},e.n=function(n){var c=n&&n.__esModule?function(){return n.default}:function(){return n};return e.d(c,"a",c),c},e.o=function(n,c){return Object.prototype.hasOwnProperty.call(n,c)},e.p="",e(e.s=0)}([function(module,__webpack_exports__,__webpack_require__){"use strict";eval("__webpack_require__.r(__webpack_exports__);\n\n// CONCATENATED MODULE: ./src/math.js\nconst add = (a, b) => {\n  console.log(a + b);\n};\nconst minus = (a, b) => {\n  console.log(a - b);\n};\n// CONCATENATED MODULE: ./src/index.js\n// 入口文件\n// 如果编写一个库的话可以把这行注释掉，业务代码可以添加 babel-polyfill\n// import \"@babel/polyfill\"; // 这个和 useBuiltIns: 'usage' 有一个就可以\n\n\n\n\n\n // import './iconfont.css'\n// import './style.css'\n// import counter from './counter'\n// import number from './number'\n//\n// counter();\n// number();\n//\n// // js 实现 hotModuleReplacement 的功能\n// if (module.hot) {\n//   // 开启了 HMR 功能\n//   // 如果 number 这个文件发生了变化，就执行后面的回调函数\n//   module.hot.accept('./number', () => {\n//     // 移除掉之前渲染的 number 函数，再重新渲染一下\n//     document.body.removeChild(document.getElementById('number'));\n//     number();\n//   })\n// }\n//\n// CreateAvatar();\n//\n// new Header();\n// new SideBar();\n// new Content();\n//\n// let img = new Image();\n// img.src = avatar;\n// img.classList.add(style.avatar);\n// let root = document.getElementById('root');\n// root.append(img);\n//\n// let dom = document.createElement('div');\n// dom.classList.add('iconfont', 'icon-webpack');\n// root.append(dom);\n//\n// var button = document.createElement('button');\n// document.body.appendChild(button);\n// button.innerHTML = '新增';\n// button.onclick = function () {\n//   var div = document.createElement('div');\n//   div.innerHTML = 'item';\n//   document.body.appendChild(div);\n// };\n// babel 转 es6\n// const arr = [\n//   new Promise(() => {}),\n//   new Promise(() => {})\n// ];\n// arr.map((item) => {\n//   console.log(item);\n// });\n// react\n// import React from 'react'\n// import ReactDom from 'react-dom'\n//\n// class App extends React.Component{\n//   render () {\n//     return (\n//       <div>Hello World</div>\n//     )\n//   }\n// }\n//\n// ReactDom.render(\n//   <App />,\n//   document.getElementById(\"root\")\n// );\n// tree shaking\n// 把一个模块里面没有用的东西都去掉，在这个例子中，只引入了 add 方法，而 minus 方法没有引入但是默认也会打包，那么 Tree shaking 就可以把这个没有用到的 miuns \"摇晃掉\"，不让他被打包\n// 可以把每一个模块理解成一个树结构，比如说我引入这个模块，只是引入了这个模块里面的一部分内容，那些没有被引入的可以通过 Tree Shaking 被“摇晃下去”，就不会被打包了，免得做无用功\n// 只支持 ES Module 的引入方法也就是 import引入\n\n\nadd(1, 6);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9tYXRoLmpzPzVhMDMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzP2I2MzUiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGFkZCA9IChhLCBiKSA9PiB7XHJcbiAgY29uc29sZS5sb2coYSArIGIpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG1pbnVzID0gKGEsIGIpID0+IHtcclxuICBjb25zb2xlLmxvZyhhIC0gYik7XHJcbn07IiwiLy8g5YWl5Y+j5paH5Lu2XHJcbi8vIOWmguaenOe8luWGmeS4gOS4quW6k+eahOivneWPr+S7peaKiui/meihjOazqOmHiuaOie+8jOS4muWKoeS7o+eggeWPr+S7pea3u+WKoCBiYWJlbC1wb2x5ZmlsbFxyXG4vLyBpbXBvcnQgXCJAYmFiZWwvcG9seWZpbGxcIjsgLy8g6L+Z5Liq5ZKMIHVzZUJ1aWx0SW5zOiAndXNhZ2UnIOacieS4gOS4quWwseWPr+S7pVxyXG5pbXBvcnQgSGVhZGVyIGZyb20gJy4vaGVhZGVyJ1xyXG5pbXBvcnQgU2lkZUJhciBmcm9tICcuL3NpZGViYXInXHJcbmltcG9ydCBDb250ZW50IGZyb20gJy4vY29udGVudCdcclxuaW1wb3J0IENyZWF0ZUF2YXRhciBmcm9tICcuL2NyZWF0ZUF2YXRhcidcclxuaW1wb3J0IHN0eWxlIGZyb20gJy4vaW5kZXguc2NzcydcclxuaW1wb3J0IGF2YXRhciBmcm9tIFwiLi9qaW50YWl5YW4uanBnXCI7XHJcbi8vIGltcG9ydCAnLi9pY29uZm9udC5jc3MnXHJcbi8vIGltcG9ydCAnLi9zdHlsZS5jc3MnXHJcbi8vIGltcG9ydCBjb3VudGVyIGZyb20gJy4vY291bnRlcidcclxuLy8gaW1wb3J0IG51bWJlciBmcm9tICcuL251bWJlcidcclxuLy9cclxuLy8gY291bnRlcigpO1xyXG4vLyBudW1iZXIoKTtcclxuLy9cclxuLy8gLy8ganMg5a6e546wIGhvdE1vZHVsZVJlcGxhY2VtZW50IOeahOWKn+iDvVxyXG4vLyBpZiAobW9kdWxlLmhvdCkge1xyXG4vLyAgIC8vIOW8gOWQr+S6hiBITVIg5Yqf6IO9XHJcbi8vICAgLy8g5aaC5p6cIG51bWJlciDov5nkuKrmlofku7blj5HnlJ/kuoblj5jljJbvvIzlsLHmiafooYzlkI7pnaLnmoTlm57osIPlh73mlbBcclxuLy8gICBtb2R1bGUuaG90LmFjY2VwdCgnLi9udW1iZXInLCAoKSA9PiB7XHJcbi8vICAgICAvLyDnp7vpmaTmjonkuYvliY3muLLmn5PnmoQgbnVtYmVyIOWHveaVsO+8jOWGjemHjeaWsOa4suafk+S4gOS4i1xyXG4vLyAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbnVtYmVyJykpO1xyXG4vLyAgICAgbnVtYmVyKCk7XHJcbi8vICAgfSlcclxuLy8gfVxyXG5cclxuLy9cclxuLy8gQ3JlYXRlQXZhdGFyKCk7XHJcbi8vXHJcbi8vIG5ldyBIZWFkZXIoKTtcclxuLy8gbmV3IFNpZGVCYXIoKTtcclxuLy8gbmV3IENvbnRlbnQoKTtcclxuLy9cclxuLy8gbGV0IGltZyA9IG5ldyBJbWFnZSgpO1xyXG4vLyBpbWcuc3JjID0gYXZhdGFyO1xyXG4vLyBpbWcuY2xhc3NMaXN0LmFkZChzdHlsZS5hdmF0YXIpO1xyXG4vLyBsZXQgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290Jyk7XHJcbi8vIHJvb3QuYXBwZW5kKGltZyk7XHJcbi8vXHJcbi8vIGxldCBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuLy8gZG9tLmNsYXNzTGlzdC5hZGQoJ2ljb25mb250JywgJ2ljb24td2VicGFjaycpO1xyXG4vLyByb290LmFwcGVuZChkb20pO1xyXG4vL1xyXG4vLyB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbi8vIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcclxuLy8gYnV0dG9uLmlubmVySFRNTCA9ICfmlrDlop4nO1xyXG4vLyBidXR0b24ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcclxuLy8gICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbi8vICAgZGl2LmlubmVySFRNTCA9ICdpdGVtJztcclxuLy8gICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XHJcbi8vIH07XHJcblxyXG4vLyBiYWJlbCDovawgZXM2XHJcbi8vIGNvbnN0IGFyciA9IFtcclxuLy8gICBuZXcgUHJvbWlzZSgoKSA9PiB7fSksXHJcbi8vICAgbmV3IFByb21pc2UoKCkgPT4ge30pXHJcbi8vIF07XHJcbi8vIGFyci5tYXAoKGl0ZW0pID0+IHtcclxuLy8gICBjb25zb2xlLmxvZyhpdGVtKTtcclxuLy8gfSk7XHJcblxyXG4vLyByZWFjdFxyXG4vLyBpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXHJcbi8vIGltcG9ydCBSZWFjdERvbSBmcm9tICdyZWFjdC1kb20nXHJcbi8vXHJcbi8vIGNsYXNzIEFwcCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudHtcclxuLy8gICByZW5kZXIgKCkge1xyXG4vLyAgICAgcmV0dXJuIChcclxuLy8gICAgICAgPGRpdj5IZWxsbyBXb3JsZDwvZGl2PlxyXG4vLyAgICAgKVxyXG4vLyAgIH1cclxuLy8gfVxyXG4vL1xyXG4vLyBSZWFjdERvbS5yZW5kZXIoXHJcbi8vICAgPEFwcCAvPixcclxuLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJvb3RcIilcclxuLy8gKTtcclxuXHJcblxyXG4vLyB0cmVlIHNoYWtpbmdcclxuLy8g5oqK5LiA5Liq5qih5Z2X6YeM6Z2i5rKh5pyJ55So55qE5Lic6KW/6YO95Y675o6J77yM5Zyo6L+Z5Liq5L6L5a2Q5Lit77yM5Y+q5byV5YWl5LqGIGFkZCDmlrnms5XvvIzogIwgbWludXMg5pa55rOV5rKh5pyJ5byV5YWl5L2G5piv6buY6K6k5Lmf5Lya5omT5YyF77yM6YKj5LmIIFRyZWUgc2hha2luZyDlsLHlj6/ku6Xmiorov5nkuKrmsqHmnInnlKjliLDnmoQgbWl1bnMgXCLmkYfmmYPmjolcIu+8jOS4jeiuqeS7luiiq+aJk+WMhVxyXG4vLyDlj6/ku6Xmiormr4/kuIDkuKrmqKHlnZfnkIbop6PmiJDkuIDkuKrmoJHnu5PmnoTvvIzmr5TlpoLor7TmiJHlvJXlhaXov5nkuKrmqKHlnZfvvIzlj6rmmK/lvJXlhaXkuobov5nkuKrmqKHlnZfph4zpnaLnmoTkuIDpg6jliIblhoXlrrnvvIzpgqPkupvmsqHmnInooqvlvJXlhaXnmoTlj6/ku6XpgJrov4cgVHJlZSBTaGFraW5nIOiiq+KAnOaRh+aZg+S4i+WOu+KAne+8jOWwseS4jeS8muiiq+aJk+WMheS6hu+8jOWFjeW+l+WBmuaXoOeUqOWKn1xyXG4vLyDlj6rmlK/mjIEgRVMgTW9kdWxlIOeahOW8leWFpeaWueazleS5n+WwseaYryBpbXBvcnTlvJXlhaVcclxuaW1wb3J0IHsgYWRkIH0gZnJvbSAnLi9tYXRoJ1xyXG5hZGQoMSwgNik7XHJcbiJdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n")}]);