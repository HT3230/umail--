<template>
  <div>
    <el-table :data="memberlist" style="width: 100%" row-key="id" border lazy :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>

      <el-table-column prop="" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click='edit(scope.row.uid)'>编辑</el-button>

          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>

import { successAlert, warningAlert } from "../../../untils/alter"
import { memberlist } from "../../../untils/request"
export default {
  props: ['info'],

  data () {
    return {
      memberlist: []
    }
  },

  methods: {

    // 编辑
    edit (uid) {
      this.$emit("edit", uid)
    },


  },
  mounted () {
    //获取菜单列表
    memberlist().then(res => {
      this.memberlist = res.data.list
    })
  },
}
</script>
<style scoped>
</style>