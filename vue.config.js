const path = require('path')
// 配置参数
// https://cli.vuejs.org/zh/config/
module.exports = {
    baseUrl: '/',
    outputDir: 'docs',
    lintOnSave: true,
    productionSourceMap: false,
    css: {
        sourceMap: false,
        modules: false,
        loaderOptions: {
            stylus: {
                // 全局引入stylus变量
                import: [path.resolve(__dirname, './src/assets/css') + '/*.styl']
            }
        }
    },
    devServer: {
        // proxy: {
        //     '/Api': {
        //         target: '',
        //         changeOrigin: true,
        //         pathRewrite: {
        //             '^/Api': ''
        //         }
        //     }
        // },
        port: 8002
    }
}
