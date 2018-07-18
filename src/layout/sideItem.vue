<template>
    <div class="menuItem">
        <template v-for="(list, listIndex) in json">
            <!-- 有子路由的 -->
            <el-submenu v-if="list.children && list.children.length > 0" :index="list.name" :key="listIndex">
                <template slot="title">
                    <i v-if="list.meta.icon" :class="list.meta.icon"></i>
                    <span slot="title">{{ routeName(list) }}</span>
                </template>
                <template v-for="(item, itemIndex) in list.children">
                    <!-- 子路由里还有子路由的 -->
                    <my-side-item v-if="item.children && item.children.length > 0" :json="[item]" :key="itemIndex"></my-side-item>

                    <!-- 子路由里没有子路由的 -->
                    <router-link v-else :to="{'name': item.name}" :key="itemIndex">
                        <el-menu-item :index="item.name">
                            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
                            <span slot="title">{{ routeName(item) }}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>

            <!-- 没有子路由的 -->
            <router-link v-else :to="{'name': list.name}" :key="listIndex">
                <el-menu-item :index="list.name">
                    <i v-if="list.meta.icon" :class="list.meta.icon"></i>
                    <span slot="title">{{ routeName(list) }}</span>
                </el-menu-item>
            </router-link>
        </template>
    </div>
</template>
<script>
export default {
    name: 'menuItem',
    props: {
        json: Array
    },
    methods: {
        routeName(route) {
            if (route.meta && route.meta.title) {
                return route.meta.title
            } else {
                return route.name
            }
        }
    }
}
</script>
<style lang='stylus'>
.menuItem {
    a {
        display: block;
    }
}
</style>
