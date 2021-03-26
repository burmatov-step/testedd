const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;
const jsLoaders = () =>{
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
        plugins: ['@babel/plugin-proposal-class-properties']
      }
    }
  ]
 

  return loaders
}
const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: [ '@babel/polyfill', './index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
        
    },
    resolve: {
        extensions: ['.js'],
       
    },
    devtool: isDev ? 'source-map' : false,

    devServer: {
      historyApiFallback: true,
      contentBase: path.resolve(__dirname, './dist'),
      open: true,
      compress: true,
      hot: isDev,
      port: 8080,
  },
  

  target: process.env.NODE_ENV === "development" ? "web" : "browserslist",

    plugins: [
      
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            }
        }),
        
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {}
                },
              "css-loader",
              "sass-loader",
            ],
          },
          {
            test: /\.html$/,
            use: {
              loader: 'html-loader',
            },
          },
          {
            test: /\.(png|jpg|svg|gif)$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/',
                publicPath: 'images/'
              }
            }],
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: jsLoaders()


          }
        ],
      },
}