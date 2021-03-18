<template>
  <div>
    <el-table :data="catelist" style="width: 100%" row-key="id" border lazy :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column prop="id" label="分类编号" width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="180">
      </el-table-column>
      <el-table-column prop="" label="图片">
        <template slot-scope="scope">
          <div class="imgup">
            <img :src="$imgurl+scope.row.img">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click='getOne(scope.row.id)'>编辑</el-button>
            <el-button type="danger" @click='catedel(scope.row.id)'>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import { successAlert, warningAlert } from "../../../untils/alter"
import { catedelete } from '../../../untils/request'

export default {
  props: ['info'],

  data () {
    return {
      data: {}

    }
  },
  computed: {
    ...mapGetters({
      catelist: 'cate/list'
    })
  },
  methods: {

    ...mapActions({
      reqChangecatelist: 'cate/reqChangelist'
    }),
    getOne (id) {
      this.$emit('getOne', id)
    },
    catedel (id) {

      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        catedelete({ id: id }).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.reqChangecatelist()
          } else {
            warningAlert(res.data.msg)
          }
        })

      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
  },

  mounted () {
    //获取商品分类列表
    this.reqChangecatelist()

  }
}
</script>
<style scoped>
.imgup {
  text-align: center;
}
.imgup img {
  width: 100px;
  height: 100px;
}
</style>