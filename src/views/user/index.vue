<template>
  <div class="user-list-container">
    <el-form :inline="true" :model="formInline" class="user-form-inline">
      <el-form-item>
        <div style="margin: 20px;"></div>
        <el-button type="primary" @click="dialogVisible = true">+ 添加用户</el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
            <el-form-item label="名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </el-form-item>
      <el-form-item>
        <div style="margin: 20px;"></div>
        <el-input v-model="formInline.user" placeholder="搜索: 服务、名称、IP等"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="序号"
        width="50">
      </el-table-column>

      <el-table-column
        prop="username"
        label="登录名"
        width="160">
      </el-table-column>

      <el-table-column
        prop="email"
        label="邮箱地址"
        width="200">
      </el-table-column>

      <el-table-column
        prop="is_superuser"
        label="是否为超级用户"
        width="200">
      </el-table-column>

      <el-table-column
        prop="is_active"
        label="状态"
        width="80">
      </el-table-column>

      <el-table-column
        prop="last_login"
        label="最后登录"
        width="250">
      </el-table-column>

      <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleClick(scope.$index, scope.row)">查看</el-button>
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <center>
      <el-pagination
        background
        layout= "total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="page_size"
        @current-change="handleCurrentChange"
        @size-change="handlesizechange"
        :total= "totalNum">
      </el-pagination>
    </center>
  </div>
</template>

<script>
import { getUserList } from '@/api/user'

export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      },
      totalNum: 0,
      params: {
        page: 1
      },
      page_size: 20,
      formInline: {
        user: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      getUserList(this.params).then(res => {
        this.totalNum = res.count
        this.tableData = res.results
      })
    },
    handleCurrentChange(val) {
        this.params.page = val
        this.fetchData()
    },
    handlesizechange() {
        this.page_size = page-size
        this.fetchData()
    }
  }
}
</script>
