<template>
    <el-header id="header"
        height="50px">
        <div class="container">
            <!-- 左边按钮 -->
            <div class="header-left">
                <!-- 侧边栏伸缩按钮 -->
                <div class="sidebar-button"
                    :class="[sidebarStatus ? 'el-icon-my-flex-left' : 'el-icon-my-flex-right']"
                    @click="toggleSidebar"></div>
                <el-breadcrumb class="header-breadcrumb">
                    <el-breadcrumb-item v-for="(item, index) in breadcrumb"
                        :key="index"
                        :to="item.path">{{item.meta.title || item.name}}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 右边按钮 -->
            <div class="header-right">
                <div class="right-item">
                    <div class="user"
                        v-if="user">
                        <el-dropdown placement="top-end"
                            @command="onUserSelected">
                            <div class="user-info">
                                <img :src="user.headimgurl">
                                <span>{{user.nickname}}</span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :disabled="true">{{version}}</el-dropdown-item>
                                <el-dropdown-item divided
                                    command="exit">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
    </el-header>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'my-header',
    data() {
        return {
            breadcrumb: ''
        }
    },
    computed: {
        ...mapState([
            'user',
            'sidebarStatus'
        ]),
        version() {
            return 'v' + require('../../../package.json').version
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    mounted() {
        this.getBreadcrumb()
    },
    methods: {
        onUserSelected(val) {
            // 退出登录
            if (val === 'exit') {
                this.$store.commit('SET_LOGOUT')
                this.$router.push('/login')
            }
        },
        // 获取当前路由
        getBreadcrumb() {
            this.breadcrumb = this.$route.matched.filter(item => item.name)
        },
        // 切换侧边栏
        toggleSidebar() {
            this.$store.commit('SET_SIDEBAR_STATUS')
        }
    }
}
</script>
<style lang='stylus'>
$avatarSize = 30px;
#header {
    position: relative;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    padding: 0;
    z-index: 1;
    .container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .sidebar-button {
            flex-center();
            width: 50px;
            height: 50px;
            font-size: 16px;
            cursor: pointer;
            margin-right: 10px;
            transition: background 0.3s;
            &:hover {
                background: rgba(0, 0, 0, 0.025);
            }
        }
        .header-left {
            display: flex;
            align-items: center;
            .header-breadcrumb {
                font-size: 14px;
                .el-breadcrumb__item {
                    .el-breadcrumb__inner {
                        font-weight: 400;
                    }
                    &:last-child {
                        .el-breadcrumb__inner {
                            color: #97a8be;
                        }
                    }
                }
            }
        }
        .header-right {
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 30px;
            .right-item {
                color: $normalTextColor;
                font-size: 20px;
                margin: 0 10px;
                cursor: pointer;
            }
            .user {
                .user-info {
                    img {
                        display: inline-block;
                        width: $avatarSize;
                        height: $avatarSize;
                        border-radius: 100%;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                }
            }
        }
    }
}
</style>
