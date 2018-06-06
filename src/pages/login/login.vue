<template>
    <div id="login">
        <div class="login-wrapper">
            <div class="title">vue-bolg-template</div>
            <el-form class="login-form" :model="form" @submit.native.prevent="verify">
                <el-form-item>
                    <!-- username -->
                    <el-input v-model="form.username" placeholder="用户名" auto-complete='off' />
                    <span class="input-icon prepend-icon">
                        <i class="el-icon-my-user"></i>
                    </span>
                </el-form-item>
                <el-form-item>
                    <!-- password -->
                    <el-input v-model="form.password" placeholder="密码" auto-complete='off' :type="pwdWatch ? 'text' : 'password'" />
                    <span class="input-icon prepend-icon">
                        <i class="el-icon-my-lock"></i>
                    </span>
                    <span class="input-icon append-icon" @click="pwdWatch = !pwdWatch">
                        <i :class="pwdWatch ? 'el-icon-my-openEye' : 'el-icon-my-closeEye'"></i>
                    </span>
                </el-form-item>
                <!-- submit -->
                <el-input class="login_btn" type="submit" value="登录" />
            </el-form>
        </div>

    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            form: {
                username: 'uncleLian',
                password: '123456'
            },
            pwdWatch: false
        }
    },
    methods: {
        verify() {
            if (!this.form.username) {
                this.$message.error('请输入账号')
            } else if (!this.form.password) {
                this.$message.error('请输入密码')
            } else {
                this.login()
            }
        },
        login() {
            this.$store.dispatch('get_login_data', this.form)
                .then((res) => {
                    this.$message.success('登录成功')
                    this.$route.query.redirect ? this.$router.push(this.$route.query.redirect) : this.$router.push('/')
                })
                .catch((err) => {
                    console.log(err)
                    this.$message.error('账号密码错误')
                })
        }
    }
}
</script>
<style lang='stylus'>
#login {
    position: relative;
    width: 100%;
    height: 100vh;
    background: $blackColor;
    overflow: hidden;
    .login-wrapper {
        position: absolute;
        width: 520px;
        left: 0;
        right: 0;
        margin: 150px auto;
        padding: 30px;
        .title {
            display: block;
            font-size: 26px;
            font-weight: 400;
            color: #eee;
            margin: 0px auto 50px;
            text-align: center;
            font-weight: bold;
        }
        .login-form {
            .el-input__inner {
                padding: 0 36px 0 40px;
                height: 44px;
                line-height: 44px;
            }
            .input-icon {
                position: absolute;
                top: 0;
                font-size: 16px;
                user-select: none;
                cursor: pointer;
                padding: 0 10px;
                text-align: center;
                height: 100%;
                &.prepend-icon {
                    left: 0;
                }
                &.append-icon {
                    right: 0;
                }
            }
            .login_btn {
                input {
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                }
                &:hover {
                    input {
                        color: $blackColor;
                    }
                }
            }
        }
    }
}
</style>
