<template>
  <div>
    <el-table :data="goodslist" border style="width: 100%">
      <el-table-column prop="id" label="商品编号">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" width="">
      </el-table-column>
      <el-table-column prop="price" label="商品价格">
      </el-table-column>
      <el-table-column prop="market_price" label="市场价格">
      </el-table-column>
      <el-table-column prop="address" label="图片">
        <template slot-scope="scope">
          <div class="imgbox">
            <img :src="$imgurl+scope.row.img">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="是否新品">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if='scope.row.isnew==1'>是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="是否热卖">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if='scope.row.ishot==1'>是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" v-if='scope.row.status==1'>启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <div>
            <el-button type="primary" @click='edit(scope.row.id)'>编辑</el-button>
            <el-button type="danger" @click='goodsdel(scope.row.id)'>删除</el-button>
          </div>
        </template>
      </el-table-column>

    </el-table>
    <div class="page">
      <el-pagination background layout="prev, pager, next" :total="count" :page-size='4' @current-change='changepage'>
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import { goodsdelete } from '../../../untils/request'
import { successAlert, warningAlert } from "../../../untils/alter"

export default {
  data () {
    return {


    }
  },
  computed: {
    ...mapGetters({
      goodslist: 'goods/list',
      count: 'goods/count',
      page: 'goods/page'
    })
  },
  methods: {
    ...mapActions({
      reqChangegoodslist: 'goods/reqChangelist',
      reqChangegoodscount: 'goods/reqChangecount',
      reqChangegooddspage: 'goods/reqChangepage',
    }),
    changepage (page) {
      this.reqChangegoodslist(page)
    },
    // 编辑
    edit (id) {
      this.$emit('getId', id)
    },
    // 删除
    goodsdel (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        goodsdelete({ id: id }).then(res => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.reqChangegoodslist();
            this.reqChangegoodscount()
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
    this.reqChangegoodslist();
    this.reqChangegoodscount();

  }
}
</script>
<style scoped>
.imgbox img {
  width: 120px;
  height: 120px;
}
.page {
  float: right;
}
</style>