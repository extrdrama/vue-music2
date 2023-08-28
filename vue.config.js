const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: "localhost",
    port: "8088", // vue����˿ڻ��� 8088��������SpringBoot��Ŀ�˿ڳ�ͻ
    https: false,
    open: true,
    // �������ÿ������
    proxy: {
      "/api": {
        // ����������'/api'��ͷ��������Ҫʹ�ô���
        target: "http://localhost:8080", // �����Ŀ��·��(��̨)
        changeOrigin: true, // ֧�ֿ���
        pathRewrite: {
          // ��д·��: ȥ������·���п�ͷ��'/api'
          "^/api": "",
        },
      },
    },
  },
});
