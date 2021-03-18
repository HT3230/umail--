<template>
  <div>

    <el-dialog :title="info.isEdit==true?'菜单修改':'菜单添加'" :visible.sync="info.isShow" width="30%" :before-close='close'>
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="手机号">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>

          <el-form-item label="昵称">
            <el-input v-model="form.nickname"></el-input>
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
import { register, memberlist, memberinfo, memberedit } from "../../../untils/request"
import { successAlert, warningAlert } from "../../../untils/alter"

export default {
  props: ["info"],
  data () {
    return {

      form: {
        nickname: '',
        phone: '',
        password: '',
        status: 1,
      },

    }
  },

  methods: {

    //初始化数据
    del () {
      this.form = {
        nickname: '',
        phone: '',
        password: '',
        status: 1,
      }
    },
    //添加
    onSubmit () {
      register(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.info.isShow = false
        } else {
          warningAlert(res.data.msg)
        }
      })
      //获取菜单列表
      memberlist(),
        this.del(),
        this.info.isShow = false
    },

    //获取一条信息
    getOne (uid) {
      memberinfo(uid).then(res => {
        this.form = res.data.list;
        this.form.uid = uid;
      });
    },
    // 修改
    edit () {
      memberedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
        } else {
          warningAlert(res.data.msg)
        }
      }),
        this.info.isShow = false,
        this.del()

    },
    // 对话框关闭清空数据
    close () {
      this.del(),
        this.info.isShow = false

    }
  },
  mounted () {

  },

}
</script>
<style scoped>
</style>