function Sidebar() {
  var dom = document.getElementById('root');
  let sidebar = document.createElement('div');
  sidebar.innerText = 'sidebar';
  dom.append(sidebar)
}

export default Sidebar