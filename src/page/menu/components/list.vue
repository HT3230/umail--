<template>
  <div>
    <el-table :data="menulist" style="width: 100%" row-key="id" border lazy :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="菜单编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址">
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
            <el-button type="primary" @click='menuedit(scope.row.id)'>编辑</el-button>
            <el-button type="danger" @click='menudel(scope.row.id)'>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import { successAlert, warningAlert } from "../../../untils/alter"
import { menudelete } from "../../../untils/request"
export default {
  props: ['info'],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      menulist: 'menu/list'
    })
  },
  methods: {
    ...mapActions({
      reqChangelist: 'menu/reqChangelist'
    }),
    // 编辑
    menuedit (id) {
      this.$emit("edit", id)
    },
    //删除
    menudel (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        menudelete({ id: id }).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
          } else {
            warningAlert(res.data.msg)
          };
          this.reqChangelist()
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
    //获取菜单列表
    this.reqChangelist()
  },
}
</script>
<style scoped>
</style>