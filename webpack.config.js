// 讓你可以動態插入 bundle 好的 .js 檔到 .index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `${__dirname}/src/index.html`,
  filename: 'index.html',
  inject: 'body',
});

// entry 為進入點，output 為進行完 eslint、babel loader 轉譯後的檔案位置
module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: 'index_bundle.js',
  },
  module: {
    rules:[
        {
            test: /\.jsx$|\.js$/,
            loader: 'eslint-loader',
            include: `${__dirname}/src`,
            exclude: /bundle\.js$/,
            enforce:"pre"
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.css$/,
            use:[
              {
                loader:'style-loader',
                options:{
                  sourceMap:true
                }
              },
              {
                loader:"css-loader",
                options:{
                  modules:{
                    localIdentName:'[path]___[name]__[local]___[hash:base64:5]'
                  },
                  importLoaders:1,
                  
                }
              }
            ]
        },
        {
          test: /\.scss$/,
          use:[
            {
              loader:'style-loader'
            },
            {
              loader:"css-loader",
              options:{
                modules:{
                  localIdentName:'[path]___[name]__[local]___[hash:base64:5]'
                },
                importLoaders:1,
                
              }
            },
            {
              loader:'resolve-url-loader'
            },
            {
              loader:'sass-loader'
            }
          ]
        }
    ]
  },
  // 啟動開發測試用 server 設定（不能用在 production）
  devServer: {
    inline: true,
    port: 8008,
  },
  plugins: [HTMLWebpackPluginConfig],
};