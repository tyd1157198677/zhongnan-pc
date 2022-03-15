const path = require("path"); //引入path模块

const webpack = require("webpack");

const resolve = dir => {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
};

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  productionSourceMap: false,
  transpileDependencies: ["vue-clamp", "resize-detector"],
  chainWebpack: config => {
    config.module
      .rule("compile")
      .test(/\.js$/)
      .include.add(resolve("src"))
      .add(resolve("test"))
      .add(resolve("node_modules/webpack-dev-server/client"))
      .add(resolve("node_modules"))
      .end()
      .use("babel")
      .loader("babel-loader")
      .options({
        presets: [
          [
            "@babel/preset-env",
            {
              modules: false,
            },
          ],
        ],
      });
    config.plugin("html").tap(args => {
      args[0].title = "招采系统";
      return args;
    });
    config.resolve.alias.set("@", resolve("./src")).set("components", resolve("./src/components"));
  },
  // chainWebpack: config => {
  //   // config.entry.app = ["babel-polyfill", "./src/main.js"];
  //   config.module
  //     .rule("vue")
  //     .use("vue-loader")
  //     .loader("vue-loader")
  //     .tap(options => {
  //       return options;
  //     });
  //   config.plugin("html").tap(args => {
  //     args[0].title = "招采系统";
  //     return args;
  //   });
  // config.resolve.alias.set("@", resolve("./src")).set("components", resolve("./src/components"));
  // },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery",
      }),
    ],
  },
  pluginOptions: {},
};
// module.exports = {
//   publicPath: "./",
//   assetsDir: "static",
//   productionSourceMap: false,
//   css: {
//     loaderOptions: {
//       scss: {
//         prependData: '@import "~@/style/element-variables.scss";',
//       },
//     },
//   },
//   transpileDependencies: ["vue-clamp", "resize-detector"],
//   chainWebpack: config => {
//     config.module
//       .rule("vue")
//       .use("vue-loader")
//       .loader("vue-loader")
//       .tap(options => {
//         return options;
//       });
//   },
// };
