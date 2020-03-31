//同步引入
// import _ from 'lodash';
// var element =document.createElement('div');
// element.innerHTML=_.join(['dell','lee'],'-');
// document.body.appendChild(element);
//异步引入
async function getComponent() {
  const {default:_}=await  import(/*webpackChunkName:"lodash"*/'lodash');

  const element =document.createElement('div');
  element.innerHTML=_.join(['dell','lee'],'-');
  return element;
  //魔法注释
  // return import(/*webpackChunkName:"lodash"*/'lodash').then(({default:_})=>{
  //   var element =document.createElement('div');
  //   element.innerHTML=_.join(['dell','lee'],'-');
  //   return element;
  // })
}
document.addEventListener('click',()=>{
  getComponent().then(element=>{
    document.body.appendChild(element);
  })
});

