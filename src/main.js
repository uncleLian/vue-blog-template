import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'

// 第三方
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // element-ui 默认颜色
import VueProgressBar from 'vue-progressbar'

// 自定义
import '@/assets' // 字体、样式等资源
import '@/components' // 全局组件
import '@/directive' // 全局指令
import '@/filters' // 全局过滤
import '@/utils/permission' // 权限验证
import '@/utils/errorLog' // 错误捕捉
import '@/utils/cache' // 缓存

// mock数据
import '@/mock'

Vue.config.productionTip = false

// 第三方
Vue.use(ElementUI, { size: 'small' })
Vue.use(VueProgressBar)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
