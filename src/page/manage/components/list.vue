<template>
  <div>
    <!-- 编辑 -->

    <el-table :data="info.userlist" style="width: 100%" row-key="id" border lazy :tree-props="{children: 'children'}">
      <el-table-column prop="id" label="用户编号" width="180">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="所属角色">
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
            <el-button type="primary" @click='useredit(scope.row.uid)'>编辑</el-button>
            <el-button type="danger" @click='userdel(scope.row.uid)'>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination background layout="prev, pager, next" :total="info.total" :page-size='2' @current-change='changesize'>
      </el-pagination>

    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import { successAlert, warningAlert } from "../../../untils/alter"
import { userdelete, userlist, usercount } from "../../../untils/request"
export default {
  props: ['info'],
  data () {
    return {
      userlist: [],
      total: 0,
      page: 0,
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
    useredit (uid) {

      this.$emit("edit", uid)
    },
    //删除
    userdel (uid) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        userdelete({ uid: uid }).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
          } else {
            warningAlert(res.data.msg)
          };
          userlist({ size: 2, page: 1 }).then(res => {
            if (res.data.code == 200) {
              this.info.userlist = res.data.list
            }
          }),
            usercount().then(res => {
              if (res.data.code == 200) {
                this.info.total = res.data.list[0].total
              }
            })
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    //页数改变 重新请求数据
    changesize (id) {
      this.page = id == undefined ? this.page : id;
      userlist({ size: 2, page: this.page }).then(res => {
        if (res.data.list == null && this.page > 1) {
          userlist({ size: 2, page: this.page = this.page - 1 }).then(res => {
            if (res.data.code == 200) {
              this.info.userlist = res.data.list;

            }
          })
          return
        }
        else {
          this.info.userlist = res.data.list
        }
      })
      usercount().then(res => {
        if (res.data.code == 200) {
          this.info.total = res.data.list[0].total
        }
      })

    }
  },
  mounted () {
    userlist({ size: 2, page: 1 }).then(res => {
      if (res.data.code == 200) {
        this.info.userlist = res.data.list
      }
    }),
      usercount().then(res => {
        if (res.data.code == 200) {
          this.info.total = res.data.list[0].total
        }
      })
  },
}
</script>
<style scoped>
.pagination {
  float: right;
}
</style>