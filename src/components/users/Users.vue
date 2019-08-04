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
          <el-input placeholder="请输入内容" clearable v-model="queryInfo.query" @clear="getUsersList">
            <el-button slot="append" icon="el-icon-search" @click="getUsersList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addialogVisible = true">添加用户</el-button>
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
          <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 修改按钮 -->
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="showeditialogVisible(scope.row)"
          ></el-button>
          <!-- 删除按钮 -->
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row)"></el-button>
          <!-- 分配角色按钮 -->
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="allocationroleplay(scope.row)"
            ></el-button>
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
      :total="total"
    ></el-pagination>
    <!-- 添加弹出框 -->
    <el-dialog title="添加用户" :visible.sync="addialogVisible" width="50%" @close="addFormClose">
      <!-- 主体区域 -->
      <el-form :model="addruleForm" :rules="addFormrules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="addruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改弹出框 -->
    <el-dialog title="修改用户" :visible.sync="editialogVisible" width="50%" @close="editFormClose">
      <!-- 主体区域 -->
      <el-form :model="editruleForm" :rules="editFormrules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editruleForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="editruleForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="allocationrole" width="50%">
      <p>当前的用户:{{userinfo.username}}</p>
      <p>当前的角色:{{userinfo.role_name}}</p>
      <p>
        分配新角色:
        <el-select v-model="selectedRoleId" placeholder="请选择">
          <el-option
            v-for="item in allocationroleForm"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          ></el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocationrole = false">取 消</el-button>
        <el-button type="primary" @click="seaveplayer">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
           
<script>
import {
  users_api,
  usersStateChange_api,
  adduser_api,
  editgetbyid_api,
  edituser_api,
  deluser_api,
  allocationroleplay_api,
  sevesplay_api
} from "@/api";
export default {
  data() {
    // 验证邮箱
    var checkemail = (rule, value, cd) => {
      const chemail = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
      if (chemail.test(value)) {
        return cd();
      }
      return cd(new Error("请输入合法邮箱"));
    };
    // 验证手机
    var checkmobile = (rule, value, cd) => {
      const chmobile = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
      if (chmobile.test(value)) {
        return cd();
      }
      return cd(new Error("请输入合法手机号"));
    };
    return {
      selectedRoleId: "",
      allocationrole: false,
      editialogVisible: false,
      addialogVisible: false,
      value2: false,
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 3
      },
      tableData2: [],
      total: 0,
      addruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      addFormrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { validator: checkmobile, trigger: "blur" }
        ]
      },
      editruleForm: {
        id: "",
        username: "",
        email: "",
        mobile: ""
      },
      editFormrules: {
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { validator: checkemail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "请输入手机", trigger: "blur" },
          { validator: checkmobile, trigger: "blur" }
        ]
      },
      allocationroleForm: [],
      userinfo: {}
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
      this.total = res.data.total;
      console.log(this.total, 77788);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.queryInfo.pagesize = val;
      this.getUsersList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.queryInfo.pagenum = val;
      this.getUsersList();
    },
    async userStateChanged(state) {
      const { data: res } = await usersStateChange_api({
        uId: state.id,
        type: state.mg_state
      });
      if (res.meta.status !== 200) {
        state.mg_state = !state.mg_state;
        return this.$message.error("修改状态失败");
      }
      this.$message.success("更新状态成功");
    },
    //添加表单关闭重置事件
    addFormClose() {
      this.$refs.addFormRef.resetFields();
    },
    // 添加用户
    addUser() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return this.message.error("请输入完整信息");
        const { data: res } = await adduser_api(this.addruleForm);
        if (res.meta.status !== 201) {
          return this.$message.error("添加失败");
        }
        this.$message.success("添加成功");
        // 关闭表单
        this.addialogVisible = false;
        // 刷新页面
        this.getUsersList();
      });
    },
    async showeditialogVisible(id) {
      this.editialogVisible = true;
      const { data: res } = await editgetbyid_api(id);
      if (res.meta.status !== 200) return this.$message.error("查找用户失败");
      this.editruleForm = res.data;
    },
    // 编辑用户
    editUser() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return this.message.error("请输入完整信息");
        const { data: res } = await edituser_api(this.editruleForm);
        if (res.meta.status !== 200) {
          return this.$message.error("添加失败");
        }
        this.$message.success("添加成功");
        // 关闭表单
        this.editialogVisible = false;
        // 刷新页面
        this.getUsersList();
      });
    },
    editFormClose() {
      this.$refs.editFormRef.resetFields();
    },
    // 根据用户id删除用户
    async del(id) {
      const deldata = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      if (deldata !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await deluser_api(id);
      if (res.meta.status !== 200) {
        return this.message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getUsersList();
    },
    async allocationroleplay(row) {
      this.userinfo = row;
      const { data: res } = await allocationroleplay_api(row);
      if (res.meta.status !== 200) return this.$message.error("获取权限失败");
      this.allocationroleForm = res.data;
      console.log(this.allocationroleForm);
      this.allocationrole = true;
    },
    async seaveplayer() {
      const { data: res } = await sevesplay_api(
        this.userinfo.id,
        this.selectedRoleId
      );
      if (res.meta.status !== 200) return this.$message.error("修改权限失败");
      this.$message.success("修改权限成功");
      this.getUsersList();
      this.allocationrole = false;
      this.selectedRoleId = "";
      this.userinfo = {};
    }
  }
};
</script>
<style lang="less" scoped>
</style>