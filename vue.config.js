const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  devServer: {
    overlay: false
  },
  publicPath: isDev
    ? '/'
    : '/trade-tools/dist/'
}
