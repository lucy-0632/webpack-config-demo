const path=require('path');
module.exports={
  mode: "production",
  entry:'./src/index.js',
  externals: ["lodash"],//lodash打包库的时候不打包到代码里去，业务代码用库的时候需要在业务代码中引入lodash
  output: {
    path: path.resolve(__dirname,'dist'),
    filename:'library.js',
    library:'library',//使用script标签引入library
    libraryTarget: "umd"//设置library库的引入方式,若此处设置为this,使用时为this.library  此处值可为umd ,this,window,global(node.js)
  }
};
