const options = {
  watch: true,
  quick: false,
};

var path = require('path');
var webpack = require('webpack');
// var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/');
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
var pixi = path.join(phaserModule, 'build/custom/pixi.js');
var p2 = path.join(phaserModule, 'build/custom/p2.js');

// var tilemapWalker = path.join(__dirname, '/plugins/TilemapWalker');
// var phasetips = path.join(__dirname, '/plugins/Phasetips');

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

const config = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/main.js')
    ],
    vendor: [
      'pixi',
      'p2',
      'phaser',
      // 'tilemap-walker',
      // 'phasetips',
    ],
  },
  devtool: 'cheap-source-map',
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, 'dist'),
    publicPath: './dist/',
    filename: 'bundle.js',
  },
  watch: options.watch,
  plugins: [
    definePlugin,
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js'}),
    // new BrowserSyncPlugin({
    //   host: process.env.IP || 'localhost',
    //   port: process.env.PORT || 3000,
    //   server: {
    //     baseDir: ['./', './build']
    //   }
    // }),
  ],
  module: {
    rules: [
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] },
    ],
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
      // 'tilemap-walker': tilemapWalker,
      // 'phasetips': phasetips,
    }
  }
};

if (options.quick) {
  delete config.devtool;
} else {
  config.entry.app.push(
    'babel-polyfill'
  );
  config.module.rules.push(
    { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') }
  );
}

module.exports = config;
