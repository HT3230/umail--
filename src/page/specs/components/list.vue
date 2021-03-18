<template>
  <div>

    <el-table :data="specslist" border style="width: 100%">
      <el-table-column prop="id" label="规格编号" width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="" label="规格属性">
        <template slot-scope="scope">
          <div>
            <span v-for='(item,index) in scope.row.attrs' :key='index' class="span">{{item}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="状态">
        <el-button type="primary">启用</el-button>
        <el-button type="info">禁用</el-button>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click='getOne(scope.row.id)'>编辑</el-button>
            <el-button type="danger" @click='specsdel(scope.row.id)'>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="count" :page-size='2' @current-change='changepage'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { successAlert, warningAlert } from "../../../untils/alter"
import { specsdelete } from '../../../untils/request'
export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      count: 'specs/count',
      specslist: 'specs/list',
      page: 'specs/page'
    })
  },
  methods: {
    ...mapActions({
      reqChangecount: 'specs/reqChangecount',
      reqChangespecslist: 'specs/reqChangelist',
      reqChangepage: 'specs/reqChangepage'
    }),
    changepage (id) {
      this.reqChangepage(id)
      this.reqChangespecslist()
    },
    getOne (id) {
      this.$emit('getOne', id)
    },
    specsdel (id) {

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        specsdelete({ id: id }).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg)
            this.reqChangespecslist()
            this.reqChangecount()
          } else {
            warningAlert(res.data.msg)
          };

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
    this.reqChangecount()
    this.reqChangespecslist()
  }
}
</script>
<style scoped>
.page {
  float: right;
}
.span {
  color: blue;
  background: skyblue;
  margin-right: 10px;
  padding: 5px 10px;
}
</style>