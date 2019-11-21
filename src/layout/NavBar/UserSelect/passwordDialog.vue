<template>
    <el-dialog v-bind="$attrs" v-on="$listeners" width="40%" append-to-body>
        <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm" label-position="top">
            <el-form-item prop="originalPwd" label="原密码">
                <el-input v-model="form.originalPwd" auto-complete="off" type="password" show-password clearable :disabled="disabled" />
            </el-form-item>
            <el-form-item prop="newPwd" label="新密码">
                <el-input v-model="form.newPwd" auto-complete="off" type="password" show-password clearable />
            </el-form-item>
            <el-form-item prop="againNewPwd" label="再次输入新密码">
                <el-input v-model="form.againNewPwd" auto-complete="off" type="password" show-password clearable />
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" icon="el-icon-circle-check" @click="onSubmit">修 改</el-button>
            <el-button icon="el-icon-circle-close" @click="$emit('update:visible', false)">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: {
        json: {
            type: Object
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            form: {
                originalPwd: '',
                newPwd: '',
                againNewPwd: ''
            },
            rules: {
                originalPwd: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                newPwd: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ],
                againNewPwd: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    methods: {
        onSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if (this.form.newPwd === this.form.againNewPwd) {
                        this.$emit('onSubmit', this.form)
                    } else {
                        this.$message.error('两个新密码不相同')
                    }
                }
            })
        }
    }
}
</script>
