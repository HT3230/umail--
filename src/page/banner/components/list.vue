<template>
  <div>
    <el-table :data="info.bannerlist" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="180">
      </el-table-column>
      <el-table-column prop="title" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="" label="图片">
        <template slot-scope="scope">
          <div class="imgbox">
            <img :src="$imgurl+scope.row.img">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click='edit(scope.row.id)'>编辑</el-button>
            <el-button type="danger" @click='bannerdel(scope.row.id)'>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { successAlert, warningAlert } from "../../../untils/alter"

import { bannerlist, bannerdelete } from '../../../untils/request'
export default {
  props: ['info'],
  data () {
    return {

    }
  },
  methods: {
    edit (id) {
      this.$emit('getid', id)
    },
    bannerdel (id) {

      console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        bannerdelete({ id: id }).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            bannerlist().then(res => {
              this.info.bannerlist = res.data.list
            })
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


    }

  },
  mounted () {
    bannerlist().then(res => {
      this.info.bannerlist = res.data.list
    })

  },
}
</script>
<style scoped>
.imgbox img {
  width: 120px;
  height: 120px;
}
</style>