const proPlugins = [];
// 如果当前是生产环境，则使用去掉console的插件
if (process.env.NODE_ENV === "production") {
  proPlugins.push("transform-remove-console");
}
module.exports = {
  //   presets: ["@vue/app", { useBuiltIns: "entry" }],
  // presets: ["@vue/cli-plugin-babel/preset"],
  presets: [
    [
      "@vue/app",
      {
        useBuiltIns: "entry",
        polyfills: ["es6.promise", "es6.symbol"],
      },
    ],
  ],
  plugins: [...proPlugins],
};
