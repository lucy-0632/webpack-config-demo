// var Header=require('./header');
// var Content=require('./content');
// var Footer=require('./footer');
//
// new Header();
// new Content();
// new Footer();

// import avatar from './飞机电子票.jpeg';
// // import './index.scss'
// import styles from './index.scss'//模块化样式引入
// // import createAvatar from './createAvatar';
// // createAvatar();
// var img=new Image();
// img.src=avatar;
// img.classList.add(styles.img);
// var root=document.getElementById('root');
// root.append(img);
import '@babel/polyfill';
import './style.css';
var btn=document.createElement('button');
btn.innerHTML='新增';
document.body.appendChild(btn);

btn.onclick=function () {
  var div=document.createElement('div');
  div.innerHTML='item';
  document.body.appendChild(div);
}
