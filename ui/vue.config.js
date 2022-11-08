const { defineConfig } = require("@vue/cli-service");
const path = require("path");

path;

//const target = "http://localhost:3000";

module.exports = defineConfig({
  // outputDir: path.resolve(__dirname, "../api/public/"),
  transpileDependencies: true,
  lintOnSave: false,
  // devServer: {
  //   port: 8080,
  //   proxy: {
  //     //proxy 요청을 보낼 api 시작 부분
  //     "^/api": {
  //       target,
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
