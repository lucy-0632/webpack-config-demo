import avatar from './飞机电子票.jpeg';
function creatAvatar() {
  var img=new Image();
  img.src=avatar;
  img.classList.add('img');
  var root=document.getElementById('root');
  root.append(img);
}
export default creatAvatar
