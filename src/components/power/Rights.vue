<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->
    <el-card>
      <el-table :data="rigthslist" stripe border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level ==='1'">二级</el-tag>
            <el-tag type="danger" v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { rigths_api } from "@/api";
export default {
  data() {
    return {
      rigthslist: []
    };
  },
  created() {
    this.getrightslist();
  },
  methods: {
    async getrightslist() {
      const { data: res } = await rigths_api();
      if (res.meta.status !== 200) {
        return this.$message.error("获取权限列表失败");
      }
      this.rigthslist = res.data;
      console.log(this.rigthslist);
    }
  }
};
</script>

<style lang="less" scoped>
</style>
