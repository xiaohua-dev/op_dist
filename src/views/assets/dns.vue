<template>
  <div class="dns-list-container" style="border: 5px solid #eee">
    <el-form :inline="true" :model="formInline" class="dns-form-inline">
      <el-form-item>
        <div style="margin: 20px;"></div>
        <el-button type="primary" @click="dialogVisible = true">+ 添加域名</el-button>
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
        <el-input v-model="params.domain_value" placeholder="搜索: 服务、名称、IP等">
          <el-button slot="append" icon="el-icon-search" @click="searchClick"></el-button>
        </el-input>
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
        prop="domain_value"
        label="域名记录值"
        width="200">
      </el-table-column>
      <el-table-column
        prop="domain_name"
        label="域名名称"
        width="150">
      </el-table-column>
      <el-table-column
        prop="domain_rr"
        label="域名主机名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="domain_status"
        label="域名状态"
        width="80">
      </el-table-column>
      <el-table-column
        prop="domain_recordid"
        label="域名记录id"
        width="160">
      </el-table-column>
      <el-table-column
        prop="domain_type"
        label="记录类型"
        width="80"> 
      </el-table-column>
      <el-table-column
        prop="domain_ttl"
        label="生存时长"
        width="80"> 
      </el-table-column>
      <el-table-column
        prop="domain_weight"
        label="域名权重"
        width="80">
      </el-table-column>
      <el-table-column
        prop="domain_line"
        label="域名路径"
        width="80">
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
import { getDnsList } from '@/api/server'

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
      getDnsList(this.params).then(res => {
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
    },
    searchClick() {
      this.page_size = 1
      this.fetchData()
    }
  }
}
</script>
