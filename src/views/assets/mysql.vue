<template>
  <div class="server-list-container">
    <el-form :inline="true" :model="formInline" class="server-form-inline">
      <el-form-item>
        <div style="margin: 20px;"></div>
        <el-button type="primary" @click="dialogVisible = true">+ 添加主机</el-button>
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
        prop="hostname"
        label="主机名"
        width="160">
      </el-table-column>
      <el-table-column
        prop="private_ip_address"
        label="内网地址"
        width="120">
      </el-table-column>
      <el-table-column
        prop="nstanceid"
        label="主机 ID"
        width="200">
      </el-table-column>
      <el-table-column
        prop="agroup"
        label="资产属组"
        width="80">
      </el-table-column>
      <el-table-column
        prop="idc_name"
        label="IDC机房"
        width="120">
      </el-table-column>
      <el-table-column
        prop="create_author"
        label="创建者"
        width="80"> 
      </el-table-column>
      <el-table-column
        prop="run_state"
        label="状态"
        width="80"> 
      </el-table-column>
      <el-table-column
        prop="creationtime"
        label="创建时间"
        width="170">
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
    <el-pagination
      background
      layout= "total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 30, 50]"
      :page-size="page_size"
      @current-change="handleCurrentChange"
      @size-change="handlesizechange"
      :total= "totalNum">
    </el-pagination>
  </div>
</template>

<script>
import { getEcsList } from '@/api/server'

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
      getEcsList(this.params).then(res => {
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
