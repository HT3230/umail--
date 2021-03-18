<template>
  <div>

    <el-dialog :title="info.isEdit==true?'规格修改':'规格添加'" :visible.sync="info.isShow" width="40%" :before-close="handleClose">
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="规格名称">
            <el-input v-model="form.specsname"></el-input>
          </el-form-item>

          <el-form-item label="规格属性" v-for='(item,index) in specs' :key='index'>
            <el-input v-model="specs[index]" class="inp"></el-input>
            <el-button type="primary" v-if='index==0' @click='setspecs'>新增规格属性</el-button>
            <el-button type="danger" v-else @click='specsdel(index)'>删除</el-button>
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
import { specsadd, specsinfo, specsedit } from '../../../untils/request'
import { successAlert, warningAlert } from "../../../untils/alter"
import { mapActions, mapGetters } from 'vuex'
export default {
  props: ['info'],
  data () {
    return {
      form: {
        specsname: '',
        attrs: [],
        status: 1
      },
      specs: ['', '']
    }
  },
  computed: {
    ...mapGetters({
      count: 'specs/count',
      specslist: 'specs/list'
    })
  },
  methods: {
    ...mapActions({
      reqChangecount: 'specs/reqChangecount',
      reqChangespecslist: 'specs/reqChangelist'
    }),
    // 对话框关闭回调
    handleClose (done) {
      this.del()
      done()
    },
    //初数化
    del () {
      this.form = {
        specsname: '',
        attrs: [],
        status: 1
      },
        this.specs = ['', ''],
        this.info.isShow = false,
        this.info.isEdit = false
    },
    setspecs () {
      this.specs.push('')
    },
    specsdel (id) {
      this.specs.splice(id, 1)
    },
    specsgetone (id) {
      specsinfo(id).then(res => {
        this.form = res.data.list[0];
        this.form.id = id;
        this.specs = JSON.parse(this.form.attrs);

      })
    },
    // 添加
    submit () {
      this.form.attrs = JSON.stringify(this.specs);
      specsadd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqChangespecslist();
          this.reqChangecount();
          this.del()
        } else {
          warningAlert(res.data.msg)
        }
      })

    },
    // 修改
    edit () {
      this.form.attrs = JSON.stringify(this.specs)
      specsedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.reqChangespecslist();
          this.reqChangecount();
          this.del()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }
  }
}
</script>
<style scoped>
.inp {
  width: 60%;
}
</style>