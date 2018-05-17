import Vue from 'vue'
import Router from 'vue-router'

const view = () => import('@/layout/view')
// index
const index = () => import('@/pages/index/index')
const home = () => import('@/pages/index/children/home/home')
const example = () => import('@/pages/index/children/manyMenu/example')
const table = () => import('@/pages/index/children/manyMenu/table')
const permission = () => import('@/pages/index/children/manyMenu/permission')
// login
const login = () => import('@/pages/login/login')
// other
const page401 = () => import('@/pages/other/page401')
const page404 = () => import('@/pages/other/page404')

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
    },
    {
        name: 'manyMenu',
        path: 'manyMenu',
        component: view,
        redirect: '/index/manyMenu/example',
        meta: {
            icon: 'el-icon-menu',
            title: '多级菜单',
            open: true
        },
        children: [
            {
                name: 'example',
                path: 'example',
                component: example,
                meta: {
                    icon: 'el-icon-my-ravelry',
                    title: '示例'
                }
            },
            {
                name: 'table',
                path: 'table',
                component: table,
                meta: {
                    icon: 'el-icon-my-chart',
                    title: '表格'
                }
            },
            {
                name: 'permission',
                path: 'permission',
                icon: 'el-icon-my-lock',
                meta: {
                    icon: 'el-icon-my-lock',
                    title: '权限测试',
                    role: 'admin'
                },
                component: permission
            }
        ]
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
