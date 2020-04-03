const path = require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin'); //会在打包结束后自动生成html文件并把打包生成js自动引入到html中
const { CleanWebpackPlugin }=require('clean-webpack-plugin'); //先清除原有的打包目录再进行打包
const webpack=require('webpack');
module.exports = {
  entry: {
    // lodash:'./src/lodash.js',
    main:'./src/index.js',
  },//入口文件路径
  output: {//打包文件输出设置
    // publicPath: "/",//打包后html引用路径
    filename: '[name].js',//打包后文件名称
    path: path.resolve(__dirname, '../dist')  //跟绝对路径
  },
  // npx webpack —config webpackconfig.js//设置webpack打包默认文件
  module: {
    rules: [
      {
        test:/\.js$/,
        exclude:/node_modules/,//第三方模块不需要转化
        use:[{
          loader: "babel-loader"
        },{
          loader: "imports-loader?this=>window"//this默认指向当前模块，此配置将this指向window
        }]
        // loader:"babel-loader",
        // options:{
        //   "presets":[["@babel/preset-env",{
        //     targets:{
        //       chrome:'67'
        //     },
        //     useBuiltIns:'usage'//tbabel/polyfill只打包当前用到的es6语法
        //   }]]
        // }
      },
      //loader执行顺序是：从下到上，从右到左
    //   {
    //   test:/\.(jpeg|jpg|png|gif)$/,
    //   use:{
    //     loader:"file-loader",//把jpg文件移动到dist目录下并且将文件名返回给变量
    //     options:{
    //       //Placeholder占位符
    //        name:'[path][name]_[hash].[ext]',//命名打包后文件名为原名_hash.后缀
    //       // publicPath: 'assets/',//打包后引用的img 标签属性src中路径assets/...
    //       outputPath:'images/',//打包后文件放到images目录下
    //       // emitFile: false,
    //       // useRelativePath: process.env.NODE_ENV === "production"
    //     }
    //   }
    // },
      {
        test:/\.(jpeg|jpg|png|gif)$/,
        use:{
          loader: "url-loader",//url-loader将文件打包成base64位图片
          options:{
            limit:2048, //使用url-loader使用，如果图片大于20kb生成图片文件,否则使用base64
            // mimetype: 'image/png',
            fallback: 'file-loader'//当文件大于限制（字节）时指定文件的加载程序
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
        //css-loader分晰出几个css文件之间的关系,并把几个css文件合并成一段css,style-loader 在得到css-loader生成的内容后把内容挂载到head标签中
      },
      {
        test:/\.scss$/,
        use:['style-loader',
          {
            loader: "css-loader",
            options:{
              importLoaders:2,//通过import引入的scss文件都会依次从下到上执行loader
              modules:true
            }
          },
          'sass-loader','postcss-loader']
        //npm install sass-loader node-sass -D
      },
      ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    // new webpack.HotModuleReplacementPlugin()
    //垫片shimming
    new webpack.ProvidePlugin({
      $:'jquery',
      _:'lodash'
    })
  ],
  optimization: {
    runtimeChunk: {
      name: "runtime"//此项设置会生成runtime.js文件，用来存储manifest (即main.js与vendor.js代码之间的关系),主要是为了解决老版本中contenthash处理
    },
    splitChunks:{
      chunks: 'all',//async只对异步代码生效 all为同步、异步都做代码分割，initial为同步代码分割
      minSize: 30000,//引入的代码大于30kb做代码分割，如果小于30kb不做代码分割
      maxSize:0,
      // minRemainingSize: 0,
      // maxSize: 50000,//当大于50kb 时会进行二次分割
      minChunks: 1,//被引入超过1次
      maxAsyncRequests: 5,//同时加载的代码库最多5个
      maxInitialRequests: 3,//入口文件加载时最多分割出3个代码文件
      automaticNameDelimiter: '~',//组与文件之间文件名连接符
      name:true,
      // automaticNameMaxLength: 30,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,//值越大优先级越高
          // filename: "vendors.js"
        },
        default:false
        // default: {
        //   // minChunks: 2,
        //   priority: -20,
        //   reuseExistingChunk: true//如果一个模块打包过就次打包到这个模块就忽略
        // }
      }
    }
    // splitChunks:{//代码分割
    //   chunks: "all",
    //   cacheGroups: {//打包后文件命名去掉vendors
    //     vendors:false,
    //     default:false
    //   }
    // }
    //   usedExports: true //tree shaking用来只打包业务代码需要模块，打包开发环境使用tree shaking 只支持ES module模式引入 不需要使用tree shaking的文件需要在package.json中通过设置"sideEffects":["@babel/polly-fill"]来实现
  }
};
