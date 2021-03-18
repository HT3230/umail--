<template>
  <div>
    <el-dialog :title="info.isEdit==true?'商品编辑':'商品添加'" :visible.sync="info.isShow" width="30%" :before-close="handleClose">
      <span>
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item label="上级分类">
            <el-select v-model="form.pid" placeholder="请选择活动区域">
              <el-option label="顶级分类" :value="0"></el-option>
              <el-option :label="item.catename" :value="item.id" v-for='(item,index) in catelist' :key='index'></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="分类名称">
            <el-input v-model="form.catename"></el-input>
          </el-form-item>

          <el-form-item label="图片">
            <div class="imgbox">
              <h1>+</h1>

              <img :src="imgUrl" v-if='imgUrl'>
              <input type="file" @change='changeimg'>
            </div>
          </el-form-item>

          <el-form-item label="状态">
            <el-switch v-model="form.status" :active-value='1' :inactive-value='2'></el-switch>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" @click="submit" v-if='info.isEdit==false'>添加</el-button>
            <el-button type="primary" @click="edit" v-else>修改</el-button>
          </el-form-item>
        </el-form>
      </span>

    </el-dialog>
    
  </div>
</template>
<script>
import { successAlert, warningAlert } from "../../../untils/alter"
import { cateadd, cateinfo, cateedit } from '../../../untils/request'
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['info'],
  data () {
    return {
      imgUrl: '',
      form: {
        pid: 0,
        catename: '',
        img: '',
        status: 1
      }
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
    
    // 初始化数据
    del () {
      this.imgUrl = '',
        this.form = {
          pid: 0,
          catename: '',
          img: '',
          status: 1
        }
    },


    handleClose (done) {
      this.info.isEdit = false
      this.del()
      done()
    },
    changeimg (e) {
      let files = e.target.files[0];
      this.form.img = files;
      this.imgUrl = URL.createObjectURL(files)
    },
    // 添加
    submit () {
      cateadd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          this.reqChangecatelist()
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    //获取一条数据
    getinfo (id) {
      cateinfo(id).then(res => {
        if (res.data.code === 200) {
          this.form = res.data.list
          this.imgUrl = this.$imgurl + this.form.img
          this.form.id = id
        }
      })
    },
    edit () {
      cateedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isEdit = false;
          this.info.isShow = false
          this.reqChangecatelist();
          this.del()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted () {
    this.reqChangecatelist()
  },
}

</script>
<style scoped>
.imgbox {
  width: 150px;
  height: 150px;
  border: 1px dashed #eee;
  position: relative;
}
.imgbox h1 {
  margin: 0;
  line-height: 150px;
  text-align: center;
  font-size: 40px;
}
.imgbox input {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  opacity: 0;
}
.imgbox img {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
}
</style>