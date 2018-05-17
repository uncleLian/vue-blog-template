<template>
    <el-header id="header" height="80px">
        <div class="container">
            <!-- logo -->
            <router-link class="header-logo" to="/">
                <span>vueBlog-template</span>
            </router-link>

            <div class="header-right">
                <div class="right-item">
                    <div class="user" v-if="user">
                        <el-dropdown placement="top-end" @command="onUserSelected">
                            <div class="user-info">
                                <img :src="user.headimgurl">
                                <span class="el-dropdown-link">{{user.nickname}}</span>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :disabled="true">v1.0.0</el-dropdown-item>
                                <el-dropdown-item divided command="exit">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </div>
            </div>
        </div>
        <!-- breadcrumb -->
        <el-breadcrumb class="header-breadcrumb" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="(item,index) in breadcrumb" :key="index" :to="item.path">{{item.meta.title || item.name}}</el-breadcrumb-item>
        </el-breadcrumb>
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
            'logs'
        ])
    },
    watch: {
        $route() {
            this.getBreadcrumb()
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.$el.querySelector('.header-breadcrumb').style.left = document.getElementById('side').offsetWidth + 'px'
        })
        this.getBreadcrumb()
    },
    methods: {
        onUserSelected(val) {
            if (val === 'exit') {
                this.$store.commit('loginOut')
                this.$router.push('/login')
            }
        },
        getBreadcrumb() {
            this.breadcrumb = this.$route.matched.filter(item => item.name)
        }
    }
}
</script>
<style lang='stylus'>
#header {
    position: relative;
    width: 100%;
    background-color: $appColor;
    padding: 0 50px 0 40px;
    .container {
        position: relative;
        width: 100%;
        height: 100%;
        .header-logo {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            color: #fff;
            font-size: 20px;
            font-weight: bold;
            span {
                display: inline-block;
                vertical-align: middle;
            }
        }
        .header-right {
            height: 100%;
            float: right;
            display: flex;
            align-items: center;
            color: #fff;
            font-size: 20px;
            .right-item {
                font-size: 0;
                margin: 0 10px;
                cursor: pointer;
            }
            .bug {
                color: inherit;
                font-size: 20px;
                padding: 2px 4px;
                border: none;
                outline: none;
            }
            .i18n {
                display: flex;
                align-items: center;
                font-size: 15px;
                color: #fff;
                i {
                    margin-left: 4px;
                }
            }
            .user {
                .user-info {
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 100%;
                        vertical-align: middle;
                        margin-right: 5px;
                    }
                    span {
                        color: #fff;
                    }
                }
            }
        }
    }
    .header-breadcrumb {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        padding: 0 20px;
        .el-breadcrumb__inner {
            color: #fff;
        }
        .el-breadcrumb__separator {
            color: #fff;
        }
    }
}
</style>
