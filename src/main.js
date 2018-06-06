import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// css
import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/global.css'
// js
import '@/permission'
import '@/errorLog'

// mock数据
import '@/mock'

// 自定义公共组件
import sticky from '@/components/sticky'
import sideItem from '@/layout/sideItem'

// 自定义过滤
import filters from '@/filters'

// 第三方
import axios from 'axios'
import ElementUI from 'element-ui'
import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false

Vue.component('my-sticky', sticky)
Vue.component('my-side-item', sideItem)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.prototype.$http = axios
Vue.use(ElementUI, { size: 'medium' })
Vue.use(VueProgressBar, {
    color: '#29F',
    failedColor: 'red',
    thickness: '2px'
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})
