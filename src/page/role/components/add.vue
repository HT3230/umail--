<template>
  <div>
    <!-- 改写编辑 -->
    <el-dialog :title="info.isEdit==true?'角色修改':'角色添加'" :visible.sync="info.isShow" width="30%" :before-close="close" close-on-click-modal>
      <span>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="角色名称">
            <el-input v-model="form.rolename"></el-input>
          </el-form-item>

          <el-form-item label="角色权限">
            <el-tree :data="menulist" show-checkbox default-expand-all node-key="id" highlight-current :props="defaultProps" ref="tree">
            </el-tree>

          </el-form-item>

          <el-form-item label="状态">
            <el-switch v-model="form.status" :active-value='1' :inactive-value="2"></el-switch>
          </el-form-item>

          <el-form-item label="">
            <el-button type="primary" @click="submit" v-if='info.isEdit==false'>添加</el-button>
            <el-button type="primary" @click="setOne" v-else>修改</el-button>
          </el-form-item>

        </el-form>

      </span>

    </el-dialog>

  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import { roleadd, roleinfo, roleedit } from "../../../untils/request"
import { successAlert, warningAlert } from "../../../untils/alter"

export default {
  props: ["info"],
  data () {
    return {
      form: {
        rolename: '',
        menus: [],
        status: 1
      },
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    };
  },
  computed: {
    ...mapGetters({
      menulist: 'menu/list'
    })
  },
  methods: {
    ...mapActions({
      reqChangemenulist: 'menu/reqChangelist',
      reqChangerolelist: 'role/reqChangelist'

    }),
    // 初始化数据
    del () {
      this.form = {
        rolename: '',
        menus: [],
        status: 1
      }
    },
    // 对话框关闭回调
    close (done) {
      this.del()
      this.$refs.tree.setCheckedNodes([])
      this.info.isEdit = false
      done()
    },
    //添加
    submit () {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys())
      roleadd(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.info.isShow = false;
          this.reqChangerolelist()
          this.del()
        } else {
          warningAlert(res.data.msg);
        };
      })
    },
    //渲染一条数据
    roleEdit (id) {
      roleinfo(id).then(res => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          this.form.id = id
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
        }
      })
    },
    //修改数据
    setOne () {
      roleedit(this.form).then(res => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          this.info.isShow = false
          this.reqChangerolelist()
          this.del()
        } else {
          warningAlert(res.data.msg)
        }
      })
    }

  },
  mounted () {
    this.reqChangemenulist()
  }
};
</script>