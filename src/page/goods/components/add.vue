<template>
  <div>
    <el-dialog title="提示" :visible.sync="info.isShow" width="30%" :before-close="handleClose">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="一级分类">
            <el-select v-model="form.first_cateid" placeholder="请选择" @change='first_cateid(form.first_cateid)'>
              <el-option :label="item.catename" :value="item.id" v-for='(item,index) in catelist' :key='index'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="二级分类">
            <el-select v-model="form.second_cateid" placeholder="请选择">
              <el-option :label="item.catename" :value="item.id" v-for='(item,index) in second_list' :key='index'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="form.goodsname"></el-input>
          </el-form-item>
          <el-form-item label="价格">
            <el-input v-model="form.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格">
            <el-input v-model="form.market_price"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <template>
              <div class="imgbox">
                <h1>+</h1>
                <img :src="imgurl" v-if='imgurl'>
                <input type="file" @change='changeimg'>
              </div>
            </template>

          </el-form-item>
          <el-form-item label="商品规格">
            <el-select v-model="form.specsid" placeholder="请选择" @change='changespecs(form.specsid)'>
              <el-option :label="item.specsname" :value="item.id" v-for='(item,index) in specslist' :key='index'></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="规格属性">
            <el-select v-model="form.specsattr" multiple placeholder="请选择">
              <el-option v-for="item in specs_list" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>

          </el-form-item>

          <el-form-item label="是否新品">
            <el-radio v-model="form.isnew" :label="1">是</el-radio>
            <el-radio v-model="form.isnew" :label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="是否热卖">
            <el-radio v-model="form.ishot" :label="1">是</el-radio>
            <el-radio v-model="form.ishot" :label="2">否</el-radio>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch v-model="form.status" :active-value='1' :inactive-value='2'></el-switch>
          </el-form-item>
          <el-form-item label="商品描述">
            <textarea name="" id="" cols="30" rows="10" v-model="form.description"></textarea>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click='submit'>添加</el-button>
            <el-button type="primary" @click='edit'>修改</el-button>
          </el-form-item>
        </el-form>
      </span>

    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { goodsadd, goodsinfo, goodsedit } from '../../../untils/request'
import { successAlert, warningAlert } from "../../../untils/alter"

export default {
  props: ['info'],
  data () {
    return {
      imgurl: '',
      second_cate: '',
      second_list: '',
      specs: '',
      specs_list: '',
      form: {
        first_cateid: '',
        second_cateid: '',
        goodsname: '',
        price: 0,
        market_price: 0,
        img: '',
        description: '',
        specsid: '',
        specsattr: '',
        isnew: 1,
        ishot: 1,
        status: 1
      }

    }
  },
  computed: {
    ...mapGetters({
      catelist: 'cate/list',
      specslist: 'specs/list'
    })
  },
  methods: {
    ...mapActions({
      reqChangecatelist: 'cate/reqChangelist',
      reqChangespecslist: 'specs/reqChangelist',
      reqChangegoodslist: 'goods/reqChangelist',
      reqChangecount: 'goods/reqChangecount'
    }),
    //对话框关闭前的回调
    handleClose (done) {
      this.del()
      done()
    },
    //初始化数据
    del () {
      this.form = {
        first_cateid: '',
        second_cateid: '',
        goodsname: '',
        price: 0,
        market_price: 0,
        img: '',
        description: '',
        specsid: '',
        specsattr: '',
        isnew: 1,
        ishot: 1,
        status: 1
      },
        this.imgurl = '',
        this.second_cate = '',
        this.second_list = '',
        this.specs = '',
        this.specs_list = ''
      this.info.isEdit = false
    },
    // 根据一级分类获取二级分类数据
    first_cateid (id) {
      console.log('启动');

      this.form.second_cateid = this.info.isEdit ? this.form.second_cateid : '',
        this.second_cate = this.catelist.filter(key => {
          return key.id == id
        }),
        this.second_list = this.second_cate[0].children
    },
    changeimg (e) {

      let files = e.target.files[0];
      this.form.img = files;
      this.imgurl = URL.createObjectURL(files)
    },
    changespecs (id) {
      this.form.specsattr = this.info.isEdit ? this.form.specsattr : '';
      this.specs = this.specslist.filter(key => {
        return key.id == id
      });
      this.specs_list = this.specs[0].attrs;
    },
    // 添加
    submit () {
      goodsadd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          this.reqChangecount()
          this.reqChangegoodslist()
          this.del()

        } else {
          warningAlert(res.data.msg)
        }
      })
    },
    //修改
    getOne (id) {
      goodsinfo(id).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.specsattr = res.data.list.specsattr.split(',')
          this.first_cateid(this.form.first_cateid)
          this.changespecs(this.form.specsid)
          this.imgurl = this.$imgurl + this.form.img
          this.form.id = id
        }
      })
    },
    //修改
    edit () {
      goodsedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          this.reqChangegoodslist()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted () {
    this.reqChangecatelist()
    this.reqChangespecslist()
  }
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
.imgbox img {
  position: absolute;
  top: 0;
  width: 150px;
  height: 150px;
}
.imgbox input {
  position: absolute;
  top: 0;
  width: 150px;
  height: 150px;
  opacity: 0;
}
</style>