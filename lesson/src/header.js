function Header() {
  var dom = document.getElementById('root');
  let header = document.createElement('div');
  header.innerText = 'header';
  dom.append(header)
}

export default Header