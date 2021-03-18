<template>
  <div>

    <el-dialog :title="info.isEdit==true?'菜单修改':'菜单添加'" :visible.sync="info.isShow" width="30%" :before-close='close'>
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="菜单名称">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="上级菜单">
            <el-select v-model="form.pid" placeholder="请选择" @change='changePid'>
              <el-option label="请选择" value=""></el-option>
              <el-option label="顶级菜单" :value="0"></el-option>
              <el-option :label="item.title" :value="item.id" v-for="(item,index) in menulist" :key='index'></el-option>

            </el-select>
          </el-form-item>

          <el-form-item label="菜单类型">
            <el-radio-group v-model="form.type">
              <el-radio :label="1" disabled>目录</el-radio>
              <el-radio :label="2" disabled>菜单</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="菜单图标" v-if="form.type==1">
            <el-select v-model="form.icon" placeholder="请选择">
              <el-option :value="item" v-for="item in icon" :key='item'><i :class="item"></i></el-option>

            </el-select>
          </el-form-item>
          <el-form-item label="菜单地址" v-else>
            <el-select v-model="form.url" placeholder="请选择">
              <el-option :value="'/'+item.path" v-for="(item,index) in routerlist" :key='index'></el-option>

            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-switch v-model="form.status" :active-value=1 :inactive-value=2></el-switch>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" @click="onSubmit" v-if='info.isEdit==false'>添加</el-button>
            <el-button type="primary" @click="edit" v-else>修改</el-button>

          </el-form-item>

        </el-form>
      </span>

    </el-dialog>

  </div>
</template>
<script>
import { routerlist } from "../../../router/index"
import { menuadd, menuinfo, menuedit } from "../../../untils/request"
import { successAlert, warningAlert } from "../../../untils/alter"
import { mapGetters, mapActions } from "vuex"
export default {
  props: ["info"],
  data () {
    return {
      routerlist: routerlist,
      form: {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1,
      },
      icon: ['el-icon-s-tools', 'el-icon-goods', 'el-icon-user-solid', 'el-icon-message-solid']
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
    //初始化数据
    del () {
      this.form = {
        pid: 0,
        title: '',
        icon: '',
        type: 1,
        url: '',
        status: 1,
      }
    },
    //添加
    onSubmit () {
      menuadd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
        } else {
          warningAlert(res.data.msg)
        }
      })
      this.del(),
        //获取菜单列表
        this.reqChangelist(),
        this.info.isShow = false
    },
    changePid () {
      if (this.form.pid == 0) {
        this.form.type = 1
      } else {
        this.form.type = 2
      }
    },
    //获取一条信息
    getOne (id) {

      menuinfo(id).then(res => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 修改
    edit () {
      menuedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
        } else {
          warningAlert(res.data.msg)
        }
      }),
        this.info.isShow = false,
        this.del(),
        //获取菜单列表
        this.reqChangelist()
    },
    // 对话框关闭清空数据
    close () {
      this.del(),
        this.info.isShow = false

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