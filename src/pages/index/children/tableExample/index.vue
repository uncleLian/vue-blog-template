<template>
    <div id="tableExample">
        <!-- 查询 & 按钮 -->
        <div class="filter-container">
            <div class="left">
                <div class="filter-item">
                    <el-input v-model="listQuery.searchContent" clearable auto-complete="off" placeholder="标题" @keyup.enter.native="getTableList" @clear="getTableList">
                        <el-button slot="append" icon="el-icon-search" @click="getTableList"></el-button>
                    </el-input>
                </div>
            </div>
            <div class="right">
                <div class="filter-item">
                    <el-button type="primary" icon="el-icon-plus" @click="createVisible = true">新增数据</el-button>
                </div>
            </div>
        </div>
        <!-- 表格 -->
        <div class="table-container">
            <el-table :data="tableJson" style="width: 100%" border fit :header-cell-style="{'text-align': 'center'}" v-loading="loading" element-loading-text="加载中..." :height="tableHeight > 300 ? tableHeight : 300">
                <el-table-column type="index" align="center" label="序号" width="65">
                    <template slot-scope="scope">
                        <span>{{scope.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="ID" width="100">
                    <template slot-scope="scope">
                        <span>{{scope.row.sound.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="标题" min-width="300">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <template v-if="scope.row.sound.song_info">
                                <p v-if="scope.row.sound.song_info.name">{{scope.row.sound.song_info.name.type}}: {{ scope.row.sound.song_info.name.name}}</p>
                                <p v-if="scope.row.sound.song_info.author">{{scope.row.sound.song_info.author.type}}: {{ scope.row.sound.song_info.author.name}}</p>
                                <p v-if="scope.row.sound.song_info.album_name">{{scope.row.sound.song_info.album_name.type}}: {{ scope.row.sound.song_info.album_name.name}}</p>
                            </template>
                            <div slot="reference">
                                <el-tag size="medium" type="info">{{scope.row.sound.name}}</el-tag>
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="频道" min-width="200">
                    <template slot-scope="scope">
                        <el-tag size="medium">{{scope.row.sound.channel.name}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="作者" min-width="120">
                    <template slot-scope="scope">
                        <span>{{scope.row.sound.user.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="时间" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time" style="margin-right: 5px"></i>
                        <span>{{scope.row.sound.update_time | formatTime('{y}-{m}-{d} {h}:{i}')}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="200" fixed="right">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" @click="handleDialogVisible(scope.row, 'editVisible')">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" @click="deleteAction(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 分页 -->
        <div class="pagination-container">
            <div class="left">
                <el-pagination @current-change="handleCurrentChange" :current-page="listQuery.currentPage" :page-size="listQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" :page-sizes="[10, 20, 50, 100]" @size-change="handleSizeChange">
                </el-pagination>
            </div>
        </div>
        <!-- 弹框 -->
        <app-dialog title="新增数据" v-if="createVisible" :visible.sync="createVisible" @onSubmit="createAction" />
        <app-dialog title="编辑数据" v-if="editVisible" :visible.sync="editVisible" @onSubmit="editAction" :json="editItem" disabled />
    </div>
</template>
<script>
import { getList } from '@/api/list'
import appDialog from './dialog'
export default {
    name: 'tableExample',
    components: { appDialog },
    data() {
        return {
            loading: false,
            listQuery: {
                currentPage: 1,
                pageSize: 10
            },
            total: 0,
            tableJson: [],
            editItem: null,
            createVisible: false,
            editVisible: false
        }
    },
    computed: {
        tableHeight() {
            return window.innerHeight - 247
        }
    },
    created() {
        this.getTableList()
    },
    methods: {
        getTableList(loading = true, page = 1) {
            this.listQuery.currentPage = page
            if (loading) this.loading = true
            getList(this.listQuery).then(res => {
                console.log(res)
                this.tableJson = res.data
                this.total = res.totalCount = res.data.length
                // this.total = res.totalCount
                if (loading) this.loading = false
            }).catch(() => {
                if (loading) this.loading = false
            })
        },
        createAction(form) {
            // createList(form).then(res => {
            this.getTableList()
            this.createVisible = false
            this.$message.success('新增成功')
            // })
        },
        editAction(form) {
            // editList(form).then(res => {
            this.getTableList(false, this.listQuery.currentPage)
            this.editVisible = false
            this.$message.success('修改成功')
            // })
        },
        deleteAction(item, index) {
            this.$confirm(`确定要删除【${item.sound.name}】吗？`, {
                title: '提示',
                type: 'warning'
            }).then(() => {
                // editList(form).then(res => {
                this.getTableList(false, this.listQuery.currentPage)
                this.$message.success('删除成功')
                // })
            }).catch(() => { })
        },
        handleDialogVisible(item, key) {
            this.editItem = item
            this[key] = true
        },
        handleCurrentChange(page) {
            this.getTableList(true, page)
        },
        handleSizeChange(val) {
            this.listQuery.pageSize = val
            this.getTableList()
        }
    }
}
</script>
<style lang='stylus'>
#tableExample {
}
</style>
