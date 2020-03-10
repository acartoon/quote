const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin= require('copy-webpack-plugin');
const configurePug = require('pug-require');

const pages = [
  {name: 'index', adress: 'index'},
  // {name: 'quote', adress: 'quote'},
];

// let isProduction = (process.env.NODE_ENV == "production");

module.exports = {
  devtool: 'source-map',
  mode: "development",
  entry: {
    // context: path.resolve(__dirname, 'src'),
    app: [
      './src/js/index.js',
      './src/style/main.scss',
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './dist'),
  },

  devServer: {
    contentBase: path.join(__dirname, `dist`),
    compress: false,
    open: true,
    port: 8083,
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // { 
      //   test : /\.pug$/,
      //   use: { 
      //     loader: 'pug-loader',
      //     query: {} 
      //   }
      //  },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.pug$/,
        loaders: [{
            loader: "html-loader"
          },
          {
            loader: "pug-html-loader",
            options: {
              "pretty": true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
          ],
        })
      },
    ]
  },

  plugins: [
    ...pages.map(page => new HtmlWebpackPlugin({
        filename: `./${page.name}.html`,
        template: `./src/pages/${page.adress}.pug`,
    })),
    new ExtractTextPlugin(
      './style/style.css'
    ),
    new CopyWebpackPlugin([{
      from: './src/img',
      to: './img'
    }]),
  ]
}
