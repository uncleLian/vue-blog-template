<template>
    <el-dropdown class="userSelect" placement="bottom" trigger="click">
        <div class="userSelect-container">
            <img src="~@/assets/img/logo.png">
            <span>{{user.nickname}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item :disabled="true">{{version}}</el-dropdown-item>
            <el-dropdown-item divided @click.native="infoVisible = true">个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="passwordVisible = true">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="handleLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        <!-- dialog -->
        <info-dialog title="个人信息" v-if="infoVisible" :visible.sync="infoVisible" @onSubmit="handleChangeUserInfo" disabled :json="user" />
        <password-dialog title="修改密码" v-if="passwordVisible" :visible.sync="passwordVisible" @onSubmit="handleChangeUserPassword" />
    </el-dropdown>
</template>
<script>
import { mapState } from 'vuex'
import infoDialog from './infoDialog'
import passwordDialog from './passwordDialog'
export default {
    components: { infoDialog, passwordDialog },
    data() {
        return {
            infoVisible: false,
            passwordVisible: false
        }
    },
    computed: {
        ...mapState('login', {
            user: state => state.user
        }),
        version() {
            return 'v' + require('../../../../package.json').version
        }
    },
    methods: {
        handleLogout(val) {
            this.$store.dispatch('login/logout')
        },
        handleChangeUserInfo(form) {
            // 假修改
            const user = { ...this.user, ...form }
            this.$store.commit('login/SET_USER', user)
            this.infoVisible = false
            this.$message.success('success')
            // 实际示例
            // updateUserInfo(form).then(res => {
            //     this.infoVisible = false
            //     this.$alert('修改成功，将重新加载页面', '提示', {
            //         confirmButtonText: '确定',
            //         type: 'success',
            //         callback: action => {
            //             window.location.reload()
            //         }
            //     })
            // })
        },
        handleChangeUserPassword(form) {
            // 假修改
            this.passwordVisible = false
            this.$message.success('success')
            // 实际示例
            // updateUserPassword(form).then(res => {
            //     this.passwordVisible = false
            //     this.$alert('修改成功，请重新登录', '提示', {
            //         confirmButtonText: '确定',
            //         type: 'success',
            //         callback: action => {
            //             this.$store.dispatch('login/logout')
            //         }
            //     })
            // })
        }
    }
}
</script>
<style lang='stylus' scoped>
$avatarSize = 30px;
.userSelect {
    font-size: 14px !important;
    user-select: none;
    .userSelect-container {
        flex-center();
        height: 100%;
        img {
            display: inline-block;
            width: $avatarSize;
            height: $avatarSize;
            margin-right: 5px;
            vertical-align: middle;
            border-radius: 100%;
        }
    }
}
</style>
