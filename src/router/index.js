import Vue from 'vue'
import Router from 'vue-router'
// const view = () => import('@/layout/view')
const index = () => import('@/pages/index/index')
const home = () => import('@/pages/index/children/home/home')
const login = () => import('@/pages/login/login')
const page401 = () => import('@/pages/other/page401')
const page404 = () => import('@/pages/other/page404')

Vue.use(Router)

/* sideRoutes config
* @meta
* icon: ''                      菜单图标（支持svg-icon、el-icon）
* title: ''                     菜单标题
* login: false                  是否需要登录
* role: 'admin' || ['admin']    是否需要权限
* keep: false                   是否需要缓存
* hidden: false                 是否显示在菜单
* open: false                   是否展开菜单（有子菜单前提下）
* redirectIndex: 0              重定向到第index位子菜单（有子菜单前提下）
*/

// 要在侧边栏渲染的路由
export const sideRoutes = setRedirect([
    {
        name: 'home',
        path: 'home',
        component: home,
        meta: {
            icon: 'dashboard',
            title: '主页'
        }
    }
])

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
                login: true,
                title: '首页'
            },
            children: sideRoutes
        },
        {
            name: 'login',
            path: '/login',
            component: login
        },
        {
            name: 'page401',
            path: '/page401',
            component: page401
        },
        {
            name: 'page404',
            path: '/page404',
            component: page404
        },
        {
            path: '*',
            redirect: '/page404'
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

// 自动设置路由的重定向（有子路由前提下）
function setRedirect(routes, redirect = '/index') {
    routes.forEach(route => {
        if (route.children && route.children.length > 0) {
            if (!route.redirect) {
                let redirectIndex = route.meta && route.meta.redirectIndex ? route.meta.redirectIndex : 0
                let redirectRoute = route.children[redirectIndex]
                let redirectName = redirectRoute && redirectRoute.name ? redirectRoute.name : route.children[0].name
                route.redirect = `${redirect}/${route.name}/${redirectName}`
            }
            let index = route.redirect.lastIndexOf('/')
            let fatherDir = route.redirect.substring(0, index)
            route.children = setRedirect(route.children, fatherDir)
        }
    })
    return routes
}
