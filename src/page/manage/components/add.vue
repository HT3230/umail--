<template>
  <div>

    <el-dialog :title="info.isEdit==true?'菜单修改':'菜单添加'" :visible.sync="info.isShow" width="30%" :before-close='close'>
      <span>
        <el-form ref="form" :model="form" label-width="80px">

          <el-form-item label="所属分类">
            <el-select v-model="form.roleid" placeholder="请选择" @change='changePid'>
              <el-option :label="item.rolename" :value="item.id" v-for="(item,index) in rolelist" :key='index'></el-option>

            </el-select>
          </el-form-item>

          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>

          <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
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
import { useradd, usercount, userinfo, useredit, userlist, menuedit } from "../../../untils/request"
import { successAlert, warningAlert } from "../../../untils/alter"
import { mapGetters, mapActions } from "vuex"
export default {
  props: ["info"],
  data () {
    return {
      imgurl: '',
      routerlist: routerlist,
      form: {
        roleid: '',
        username: '',
        password: '',
        status: 1,
      },

    }
  },
  computed: {
    ...mapGetters({
      rolelist: 'role/list'
    })
  },
  methods: {
    ...mapActions({
      reqChangerolelist: 'role/reqChangelist'
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
      useradd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          userlist({ size: 2, page: 1 }).then(res => {
            if (res.data.code == 200) {
              this.userlist = res.data.list
            }
          })
        } else {
          warningAlert(res.data.msg)
        }
      }),
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
      this.del(),

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
    getOne (uid) {
      console.log(uid);
      userinfo(uid).then(res => {
        this.form = res.data.list;
        // this.form.id = id;
      });
    },
    // 修改
    edit () {
      useredit(this.form).then(res => {
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

    },



  }, mounted () {
    this.reqChangerolelist()

  },
}
</script>
<style scoped>
</style>