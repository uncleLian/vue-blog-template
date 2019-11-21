<template>
    <el-dialog v-drag v-bind="$attrs" v-on="$listeners" width="40%">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-position="top">
            <el-form-item prop="title" label="标题">
                <el-input v-model.trim="form.title" clearable auto-complete="off" placeholder="请输入标题"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" icon="el-icon-circle-check" @click="onSubmit">确 定</el-button>
            <el-button icon="el-icon-circle-close" @click="$emit('update:visible', false)">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
    props: {
        json: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                title: ''
            },
            rules: {
                title: [
                    { required: true, message: '不能为空', trigger: 'blur' }
                ]
            }
        }
    },
    created() {
        if (this.json) {
            // this.form = { ...this.json }
            this.form.title = this.json.sound.name
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
