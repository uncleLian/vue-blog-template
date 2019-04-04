import Vue from 'vue'
import permission from './permission'

const directive = [
    permission
]

// 注册全局指令
directive.forEach(item => {
    Vue.use(item)
})
