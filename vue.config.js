const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: "8088", // vue程序端口换成 8088，避免与SpringBoot项目端口冲突
    https: false,
    open: true,
    // 下面配置跨域代理
    proxy: {
      "/api": {
        // 假设所有以'/api'开头的请求都需要使用代理
        target: "http://localhost:8080", // 代理的目标路径(后台)
        changeOrigin: true, // 支持跨域
        pathRewrite: {
          // 重写路径: 去掉请求路径中开头的'/api'
          "^/api": "",
        },
      },
    },
  },
});
