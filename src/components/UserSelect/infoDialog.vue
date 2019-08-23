<template>
    <el-dialog v-bind="$attrs" v-on="$listeners" width="40%" append-to-body>
        <el-form v-loading="loading" :model="form" :rules="rules" ref="ruleForm" label-position="top">
            <el-form-item prop="nickname" label="名称">
                <el-input v-model="form.nickname" clearable auto-complete="off" />
            </el-form-item>
            <el-form-item label="角色">
                <el-tag type="primary">{{form.roles}}</el-tag>
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
                nickname: ''
            },
            rules: {
                nickname: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]
            },
            loading: false
        }
    },
    created() {
        if (this.json) {
            this.form = { ...this.json }
        }
    },
    methods: {
        onSubmit() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.$emit('onSubmit', this.form)
                }
            })
        }
    }
}
</script>
