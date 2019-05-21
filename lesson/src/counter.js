function counter() {
  var div = document.createElement('div');
  div.innerHTML = 1;
  div.setAttribute('id', 'counter');
  div.onclick = function () {
    // 按照 10 进制的进行转换
    div.innerHTML = parseInt(div.innerHTML, 10) + 1
  };
  document.body.appendChild(div)
}

export default counter