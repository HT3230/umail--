<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>
    <Add :info="info" ref="menuinfo" />
    <List :info="info" @edit='edit' />

  </div>
</template>
<script>
import Add from "../menu/components/add"
import List from "../menu/components/list"

export default {
  data () {
    return {
      info: { isShow: false, isEdit: false }
    }
  },
  methods: {
    btn () {
      this.info.isShow = !this.info.isShow;

    },
    edit (id) {
      this.info.isShow = true;
      this.info.isEdit = true;
      this.$refs.menuinfo.getOne(id)
    }
  },
  components: {
    Add, List
  }
}
</script>
<style scoped>
</style>