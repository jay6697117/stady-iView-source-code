const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

const baseConfig = {
  entry: "./src/index.js",
  output: {
    path: resolve("dist")
  },
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "@": resolve("src")
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          filename: "vendors/vendors.js"
        },
        default: {
          filename: "common.js"
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            css: [
              "vue-style-loader",
              "css-loader",
              "postcss-loader"
            ],
            scss: [
              "vue-style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 2
                }
              },
              "sass-loader",
              "postcss-loader"
            ]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "image/[name].[hash:8].[ext]",
              limit: 10000,
              fallback: "file-loader"
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[hash:8].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "media/[name].[hash:8].[ext]"
        }
      }
    ]
  }
};

module.exports = baseConfig;
