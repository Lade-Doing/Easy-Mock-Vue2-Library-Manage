// 基础版本
// module.exports = {
//   devServer: {
//     port: 8888,
//     open: true,
//     https: false,
//     host: "localhost",
//     proxy:{
//       //设置/dev-apis去代理访问
//       '/dev-apis':{
//         target:'http://localhost:8081/',
//         changeOrigin:true,//开启代理服务进行请求转发
//         pathRewrite:{
//           '^/dev-apis':'' //重写路径
//         }
//       }
//     }
//   },
//   lintOnSave: false,  //默认为true，警告仅仅会被输出到命令行，且不会使得编译失败。
//   productionSourceMap: false, //打包时，不生成.map文件，加快打包构建
// }

module.exports = {
  devServer: {
    port: 8888,
    open: true,
    https: false,
    host: "localhost",
    proxy:{
        [process.env.VUE_APP_BASE_API]:{
          target:process.env.VUE_APP_SERVICE_URL,
          changeOrigin:true,//开启代理服务进行请求转发
          pathRewrite:{
            // '^/dev-apis':'' //重写路径
            ['^'+process.env.VUE_APP_BASE_API]:''
          }
        }
      }
    },
    lintOnSave: false,  //默认为true，警告仅仅会被输出到命令行，且不会使得编译失败。
    productionSourceMap: false, //打包时，不生成.map文件，加快打包构建
}