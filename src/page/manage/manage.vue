<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>
    <Add :info="info" ref="userinfo" />
    <List :info="info" @edit='edit' />

  </div>
</template>
<script>
import Add from "../manage/components/add"
import List from "../manage/components/list"

export default {
  data () {
    return {
      info: { isShow: false, isEdit: false, total: 0, userlist: [] }
    }
  },
  methods: {
    btn () {
      this.info.isShow = !this.info.isShow;

    },
    edit (uid) {
      this.info.isShow = true;
      this.info.isEdit = true;
      this.$refs.userinfo.getOne(uid)
    }
  },
  components: {
    Add, List
  }
}
</script>
<style scoped>
</style>