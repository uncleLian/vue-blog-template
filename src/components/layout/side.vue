<template>
    <vue-position-sticky sticky-class="sticky-class">
        <el-aside id="side"
            :width="isCollapse ? '64px' : variables.menuWidth"
            :style="{'background': variables.menuBg}">
            <!-- menu -->
            <el-menu :default-active="$route.name"
                :collapse="isCollapse"
                :default-openeds="defaultOpeneds"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :active-text-color="variables.menuActiveText"
                mode="vertical">
                <my-side-item :json="filterRoutes"></my-side-item>
            </el-menu>
        </el-aside>
    </vue-position-sticky>
</template>
<script>
import { sideRoutes } from '@/router'
import variables from '@/assets/css/index.styl'
export default {
    name: 'my-side',
    data() {
        return {
            filterRoutes: [], // 过滤后的路由
            defaultOpeneds: [] // 默认打开的二级菜单
        }
    },
    computed: {
        variables() {
            return variables
        },
        isCollapse() {
            return !this.$store.state.sidebarStatus
        }
    },
    created() {
        this.filterRoutes = this.handleRoutes(sideRoutes)
    },
    methods: {
        // 递归过滤路由
        handleRoutes(Arr) {
            const Routes = Arr.filter(route => {
                if (route.name) {
                    if (route.meta) {
                        if (route.meta.hidden) {
                            return false
                        } else {
                            if (route.meta.open) {
                                this.defaultOpeneds.push(route.name)
                            }
                        }
                    }
                    if (route.children) {
                        route.children = this.handleRoutes(route.children)
                    }
                    return true
                } else {
                    return false
                }
            })
            return Routes
        }
    }
}
</script>
<style lang='stylus'>
.sticky-class {
    height: 100%;
}
#side {
    display: flex;
    flex-direction: column;
    height: 100%;
    user-select: none;
    transition: width 0.28s;
    .el-menu {
        width: 100%;
        flex-grow: 1;
        padding-bottom: 15px;
        border: none;
        transition: width 0.28s;
    }
}
</style>
