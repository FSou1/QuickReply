import { CheckerPlugin } from 'awesome-typescript-loader';
import * as CopyWebpackPlugin from 'copy-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    contentPage: path.resolve(__dirname, 'src/contentPage.ts'),
    backgroundPage: path.resolve(__dirname, 'src/backgroundPage.ts'),
  },
  output: {
    path: path.resolve(__dirname, '../angular/dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use:
          'awesome-typescript-loader?{configFileName: "chrome/tsconfig.json"}',
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/img'),
          to: 'img',
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};

export default config;