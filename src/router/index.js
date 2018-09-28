import Vue from 'vue'
import Router from 'vue-router'

// const view = () => import('@/layout/view')
// index
const index = () => import('@/views/index/index')
const home = () => import('@/views/index/children/home')
// login
const login = () => import('@/views/login/login')
// other
const page401 = () => import('@/views/other/page401')
const page404 = () => import('@/views/other/page404')

Vue.use(Router)

/* sideRoutes config
* @meta
* icon: ''                      菜单图标（可以用element-ui的icon & iconfont）
* login: false                  是否需要登录
* role: 'admin' || ['admin']    是否需要权限
* keep: false                   是否需要缓存
* open: false                   是否展开菜单
*/

// 要在侧边栏渲染的路由
export const sideRoutes = [
    {
        name: 'home',
        path: 'home',
        component: home,
        meta: {
            icon: 'el-icon-my-home',
            title: '主页'
        }
    }
]

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: '',
            redirect: '/index'
        },
        {
            name: 'index',
            path: '/index',
            component: index,
            redirect: '/index/home',
            meta: {
                title: '首页',
                login: true
            },
            children: sideRoutes
        },
        {
            name: 'login',
            path: '/login',
            component: login
        },
        {
            name: '401',
            path: '/401',
            component: page401
        },
        {
            name: '404',
            path: '/404',
            component: page404
        },
        {
            path: '*',
            redirect: '/404'
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
})
