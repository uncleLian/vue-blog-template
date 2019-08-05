import Vue from 'vue'
import Router from 'vue-router'

// 视图组件
// const PageView = () => import('@/layout/PageView')

Vue.use(Router)

/* Routes Config
* @meta
* icon: ''                      菜单图标（支持svg-icon、el-icon）
* title: ''                     菜单标题
* login: false                  是否需要登录
* roles: 'admin' || ['admin']    是否需要权限
* keep: false                   是否需要缓存（需要name才能生效）
* hidden: false                 是否显示在菜单
* open: false                   是否展开菜单（有子菜单前提下）
* redirectIndex: 0              重定向到第index位子菜单（有子菜单前提下）
* affix: false                  是否常驻在tagView组件上（外链无效）
*/

// 异步路由
export const asyncRoutes = [
    {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('@/pages/index/children/dashboard'),
        meta: {
            icon: 'dashboard',
            title: '主页',
            affix: true
        }
    },
    {
        name: 'user',
        path: 'user',
        component: () => import('@/pages/index/children/user'),
        meta: {
            icon: 'user',
            title: '用户管理'
        }
    }
]

// 本地路由
export const localRoutes = [
    {
        path: '',
        redirect: '/login'
    },
    {
        path: '/login',
        component: () => import('@/pages/login/login')
    },
    {
        path: '/page401',
        component: () => import('@/pages/other/page401')
    },
    {
        path: '/page404',
        component: () => import('@/pages/other/page404')
    }
]

const createRouter = () => new Router({
    // mode: 'history',
    routes: localRoutes,
    scrollBehavior: () => ({ y: 0 })
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router
