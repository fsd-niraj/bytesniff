const { default: HtmlPlugin } = require('@rspack/plugin-html');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    main: './src/main.jsx',
  },
  output: {
    path: 'dist',
    publicPath: '/',
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  runtime: 'automatic',
                  development: true,
                  refresh: true,
                },
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
        type: 'css',
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html',
    }),
    new ReactRefreshPlugin(),
  ],
  devServer: {
    port: 5173,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
