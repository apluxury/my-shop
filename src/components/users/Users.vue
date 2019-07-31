<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表格 -->
    <el-table :data="tableData2" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="mg_state" label="状态"> 
           <template slot-scope="scope">
              <!-- {{scope.row}} -->
              <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" ></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" ></el-button>
            </el-tooltip>
          </template>
      </el-table-column>
    </el-table>


    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
           
<script>
import { users_api } from "@/api";
export default {
  data() {
    return {
        value2:false,
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 3
      },
      tableData2: [],
      total:0
    };
  },
  created() {
    this.getUsersList();
  },
  methods: {
    async getUsersList() {
      const { data: res } = await users_api(this.queryInfo);
      if (res.meta.status !== 200)
        return this.$message.error("获取用户数据列表失败");

      this.$message({
        message: "恭喜你，这是一条成功消息",
        type: "success"
      });
      console.log(res, 666);
      this.tableData2 = res.data.users;
        this.total=res.data.total;
        console.log(this.total,77788);
        
    },

     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.queryInfo.pagesize=val
        this.getUsersList();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.queryInfo.pagenum=val;
        this.getUsersList();
      }

  }
};
</script>
<style lang="less" scoped>
</style>