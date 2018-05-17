<template>
    <my-sticky sticky-class="sticky-class">
        <el-aside id="side" width="240px">
            <el-menu class="el-side-container" :default-active="$route.name" :default-openeds="defaultOpeneds">
                <my-side-item :json="filterRoutes"></my-side-item>
            </el-menu>
        </el-aside>
    </my-sticky>
</template>
<script>
import { sideRoutes } from '@/router'
export default {
    name: 'my-side',
    data() {
        return {
            filterRoutes: [], // 过滤后的路由
            defaultOpeneds: [] // 默认打开的二级菜单
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
                            return true
                        }
                    }
                    if (route.children) {
                        route.children = this.handleRoutes(route.children)
                    }
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
    user-select: none;
    height: 100%;
    .el-side-container {
        min-height: 100%;
        padding-bottom: 15px;
    }
}
</style>
