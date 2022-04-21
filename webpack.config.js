const HtmlWebpackPlugin = require('html-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const path = require('path');

const commonConfig = {
  watch: true,
  mode: "development",
  devtool: "inline-source-map",
  // entry: {
  //   watcher: './src/watcher/watcher.ts'
  // },
  // output: {
  //   path: __dirname + '/dist/',
  //   // filename: 'preload.js'
  //   filename: '[name].js'
  // },
  module: {
    rules: [
      // {
      //   test: /\.ts$/,
      //   enforce: 'pre',
      //   loader: 'tslint-loader',
      //   options: {
      //     typeCheck: true,
      //     emitErrors: true
      //   }
      // },
      {
        test: /\.js$|jsx/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.ts$|tsx/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
    fallback: {
      "path": false
    }
  }
};

module.exports = [
  Object.assign({
      target: 'electron-main',
      entry: {
        main: './src/electron/main.ts',
        preload: './src/preload/preload.ts'
      },
      output: {
        path: path.resolve(__dirname, 'dist', 'desktop'),
        filename: '[name].js',
        // filename: 'main.js'
      },
      plugins: [
        // hotElectronLauncherPlugin
      ]
    },
    commonConfig
  ),
  Object.assign(
    {
      target: 'electron-renderer',
      entry: {
        renderer: './src/render/desktop_renderer.tsx'
      },
      output: {
        path: path.resolve(__dirname, 'dist', 'desktop'),
        filename: "[name].js"
      },
      plugins: [
        new MonacoWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: 'templates/index.html'
        })
      ]
    },
    commonConfig
  ),
  Object.assign(
    {
      target: 'web',
      entry: {
        renderer: './src/render/mobile_renderer.tsx'
      },
      output: {
        path: path.resolve(__dirname, 'dist', 'mobile'),
        filename: "[name].js"
      },
      plugins: [
        new MonacoWebpackPlugin(),
        new HtmlWebpackPlugin({
          template: 'templates/index.html'
        })
      ]
    },
    commonConfig
  ),
]