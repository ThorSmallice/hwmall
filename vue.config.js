module.exports = {
    publicPath: './', 
    productionSourceMap: false, // 取消生产环境map
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch');
    }
    // devServer: { 
    //     proxy: {
    //         '/api': {
    //             target: "http://newshopapi.0melon0.cn",
    //             ws: true,
    //             changeOrigin: true
    //         }
    //     }
    // }
}