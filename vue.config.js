
module.exports = {
  devServer: {
    // 设置代理
    // proxy: 'http://m.maoyan.com'
    proxy: {
      '/api': {
        target: "http://m.maoyan.com/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mock': {
        target: "http://m.maoyan.com",
        ws: true,
        changeOrigin: true
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'? './' : ''
}