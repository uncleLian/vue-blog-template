import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import store from '@/store'
// 第三方
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueProgressBar from 'vue-progressbar'
import vuePositionSticky from 'vue-position-sticky'
// 自定义
import 'normalize.css'
import '@/assets/css/global.css'
import '@/assets/iconfont/iconfont.css'
import '@/utils/permission'
import '@/utils/errorLog'
import components from '@/components'
import filters from '@/filters'
// mock数据
import '@/mock'

Vue.config.productionTip = false

// 第三方
Vue.use(ElementUI, { size: 'small' })
Vue.use(VueProgressBar)
Vue.use(vuePositionSticky)

// 注册全局组件
Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
})
// 注册全局过滤方法
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
