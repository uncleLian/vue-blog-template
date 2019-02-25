import Vue from 'vue'
import Router from 'vue-router'
// 视图组件
// const view = () => import('@/components/layout/view')
// index
const index = () => import('@/pages/index/index')
const home = () => import('@/pages/index/children/home')
// login
const login = () => import('@/pages/login/login')
// other
const page401 = () => import('@/pages/other/page401')
const page404 = () => import('@/pages/other/page404')

Vue.use(Router)

/* sideRoutes config
* @meta
* icon: ''                      菜单图标（可以用element-ui的icon & iconfont：需额外设置）
* login: false                  是否需要登录
* role: 'admin' || ['admin']    是否需要权限
* keep: false                   是否需要缓存
* open: false                   是否展开菜单（有子菜单前提下）
* hidden: false                 是否显示在菜单
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
