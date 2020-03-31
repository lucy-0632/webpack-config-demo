// const path = require('path');
// const HtmlWebpackPlugin=require('html-webpack-plugin'); //会在打包结束后自动生成html文件并把打包生成js自动引入到html中
// const { CleanWebpackPlugin }=require('clean-webpack-plugin'); //先清除原有的打包目录再进行打包
// const webpack=require('webpack');
const merge=require('webpack-merge');
const commonConfig=require('./webpack.common.js');
const prodConfig = {
  mode: 'production',//默认production  值有：development、 production 打包出来的文件是否压缩
  // devtool: "none",//关闭sourceMap
  devtool: "cheap-module-source-map",//sourceMap 是一个映射关系 source-map 打包后会多出map文件，inline-source-map 打包后无map文件，会通过data-url方式直接写到打包后js文件里，cheap-inline-source-map 打包后无map文件，提升打包性能，只针对业务代码，不会管第三方模块引入，cheap-module-source-map 不仅管业务代码还管第三方错误 eval 通过eval的执行形式来生成sourcemap的对应关系，是执行效率最快性能最好的打包方式,但是对复杂代码提示出来的内容可能并不全面 开发环境使用：cheap-module-eval-source-map 线上环境：cheap-module-source-map
  // entry: {
  //   main:'./src/index.js',
  //   // sub:'./src/index.js',
  // },//入口文件路径
  // output: {//打包文件输出设置
  //   // publicPath: "/",//打包后html引用路径
  //   filename: '[name].js',//打包后文件名称
  //   path: path.resolve(__dirname, 'dist')  //跟绝对路径
  // },
  // npx webpack —config webpackconfig.js//设置webpack打包默认文件
  // module: {
  //   rules: [
  //     {
  //       test:/\.js$/,
  //       exclude:/node_modules/,//第三方模块不需要转化
  //       loader:"babel-loader",
  //       // options:{
  //       //   "presets":[["@babel/preset-env",{
  //       //     targets:{
  //       //       chrome:'67'
  //       //     },
  //       //     useBuiltIns:'usage'//tbabel/polyfill只打包当前用到的es6语法
  //       //   }]]
  //       // }
  //     },
  //     //loader执行顺序是：从下到上，从右到左
  //   //   {
  //   //   test:/\.(jpeg|jpg|png|gif)$/,
  //   //   use:{
  //   //     loader:"file-loader",//把jpg文件移动到dist目录下并且将文件名返回给变量
  //   //     options:{
  //   //       //Placeholder占位符
  //   //        name:'[path][name]_[hash].[ext]',//命名打包后文件名为原名_hash.后缀
  //   //       // publicPath: 'assets/',//打包后引用的img 标签属性src中路径assets/...
  //   //       outputPath:'images/',//打包后文件放到images目录下
  //   //       // emitFile: false,
  //   //       // useRelativePath: process.env.NODE_ENV === "production"
  //   //     }
  //   //   }
  //   // },
  //     {
  //       test:/\.(jpeg|jpg|png|gif)$/,
  //       use:{
  //         loader: "url-loader",//url-loader将文件打包成base64位图片
  //         options:{
  //           limit:2048, //使用url-loader使用，如果图片大于20kb生成图片文件,否则使用base64
  //           // mimetype: 'image/png',
  //           fallback: 'file-loader'//当文件大于限制（字节）时指定文件的加载程序
  //         }
  //       }
  //     },
  //     {
  //       test:/\.css$/,
  //       use:['style-loader','css-loader']
  //       //css-loader分晰出几个css文件之间的关系,并把几个css文件合并成一段css,style-loader 在得到css-loader生成的内容后把内容挂载到head标签中
  //     },
  //     {
  //       test:/\.scss$/,
  //       use:['style-loader',
  //         {
  //           loader: "css-loader",
  //           options:{
  //             importLoaders:2,//通过import引入的scss文件都会依次从下到上执行loader
  //             modules:true
  //           }
  //         },
  //         'sass-loader','postcss-loader']
  //       //npm install sass-loader node-sass -D
  //     },
  //     ]
  // },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: 'src/index.html'
  //   }),
  //   new CleanWebpackPlugin(),
  //   // new webpack.HotModuleReplacementPlugin()
  // ],
  // optimization: {
  //   usedExports: true //tree shaking用来只打包业务代码需要模块，打包开发环境使用tree shaking 只支持ES module模式引入 不需要使用tree shaking的文件需要在package.json中通过设置"sideEffects":["@babel/polly-fill"]来实现
  // }
};
module.exports= merge(commonConfig,prodConfig)
