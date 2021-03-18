<template>
  <div>
    <el-dialog :title="info.isEdit?'轮播图修改':'轮播图添加'" :visible.sync="info.isShow" width="30%" :before-close="handleClose">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="标题">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <div class="imgbox">
              <h1>+</h1>
              <img :src="imgurl" v-if='imgurl'>
              <input type="file" @change='changeimg'>
            </div>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="form.status" :active-value='1' :inactive-value='2'></el-switch>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click='submit' v-if='info.isEdit==false'>添加</el-button>
            <el-button type="primary" @click='edit' v-else>修改</el-button>
          </el-form-item>
        </el-form>
      </span>

    </el-dialog>

  </div>
</template>
<script>
import { banneradd, bannerinfo, banneredit, bannerlist } from '../../../untils/request'
import { successAlert, warningAlert } from "../../../untils/alter"

export default {
  props: ['info'],
  data () {
    return {
      imgurl: '',
      form: {
        title: '',
        img: '',
        status: 1
      }
    }
  },
  methods: {
    //初始化
    del () {
      this.form = {
        title: '',
        img: '',
        status: 1
      };
      this.imgurl = '';
      this.info.isEdit = false
    },
    handleClose (done) {
      this.del()
      done()
    },
    changeimg (e) {
      let file = e.target.files[0];
      this.imgurl = URL.createObjectURL(file);
      this.form.img = file
    },
    //添加
    submit () {
      banneradd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          bannerlist().then(res => {
            this.info.bannerlist = res.data.list
          })
        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    //获取一条数据
    getOne (id) {
      bannerinfo(id).then(res => {
        this.form = res.data.list
        this.imgurl = this.$imgurl + this.form.img
        this.form.id = id
        bannerlist().then(res => {
          this.info.bannerlist = res.data.list
        })
      })
    },
    // 修改
    edit () {
      banneredit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false
        } else {
          warningAlert(res.data.msg)
        }
      })
    }

  }
}
</script>
<style scoped>
.imgbox {
  width: 150px;
  height: 150px;
  position: relative;
  border: 1px dashed #eee;
  background: #ccc;
}
.imgbox h1 {
  margin: 0;
  text-align: center;
  line-height: 150px;
  font-size: 40px;
}
.imgbox img {
  position: absolute;
  width: 150px;
  height: 150px;
  top: 0;
}
.imgbox input {
  position: absolute;
  top: 0;
  width: 150px;
  height: 150px;
  opacity: 0;
}
</style>