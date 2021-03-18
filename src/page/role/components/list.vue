<template>
  <div>
    <el-table :data="rolelist" border style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>

      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click='getOne(scope.row.id)'>编辑</el-button>
            <el-button type="danger" @click='roledelete(scope.row.id)'>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import { successAlert, warningAlert } from "../../../untils/alter"

import { roledelete } from '../../../untils/request'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      rolelist: 'role/list'
    })
  },
  methods: {
    ...mapActions({
      reqChangerolelist: 'role/reqChangelist'
    }),
    getOne (id) {
      this.$emit('edit', id)
    },
    roledelete (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        roledelete({ id: id }).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
          } else {
            warningAlert(res.data.msg)
          };
          this.reqChangerolelist()
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    }
  },
  mounted () {
    this.reqChangerolelist()
  },
}
</script>
<style scoped>
</style>