module.exports = {
  devServer: {
    // 设置反向代理
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
  }
}