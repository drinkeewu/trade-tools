const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  devServer: {
    overlay: false,
    open: true
  },
  pwa: {
    name: '回报计算工具',
    themeColor: '#333',
    msTileColor: '#ffffff'
  },
  publicPath: isDev
    ? '/'
    : '/trade-tools/'
}
