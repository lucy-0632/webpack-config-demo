const webpack=require('webpack');
const merge=require('webpack-merge');
const commonConfig=require('./webpack.common')
const devConfig={
  mode: 'development',//默认production  值有：development、 production 打包出来的文件是否压缩
  // devtool: "none",//关闭sourceMap
  devtool: "cheap-module-eval-source-map",//sourceMap 是一个映射关系 source-map 打包后会多出map文件，inline-source-map 打包后无map文件，会通过data-url方式直接写到打包后js文件里，cheap-inline-source-map 打包后无map文件，提升打包性能，只针对业务代码，不会管第三方模块引入，cheap-module-source-map 不仅管业务代码还管第三方错误 eval 通过eval的执行形式来生成sourcemap的对应关系，是执行效率最快性能最好的打包方式,但是对复杂代码提示出来的内容可能并不全面 开发环境使用：cheap-module-eval-source-map 线上环境：cheap-module-source-map
  devServer: {
    contentBase:'/dist',
    open:true,//自动打开浏览器并自动打开页面
    port:3000,//端口号
    hot:true,
    hotOnly:true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true //tree shaking用来只打包业务代码需要模块，打包开发环境使用tree shaking 只支持ES module模式引入 不需要使用tree shaking的文件需要在package.json中通过设置"sideEffects":["@babel/polly-fill"]来实现
  }
};
module.exports=merge(commonConfig,devConfig)
