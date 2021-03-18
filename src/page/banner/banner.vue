<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>
    <Add :info='info' ref='getOne' />
    <List :info='info' @getid='getid' />
  </div>
</template>
<script>
import Add from './components/add'
import List from './components/list'
export default {
  data () {
    return {
      info: {
        isShow: false,
        isEdit: false,
        bannerlist: []
      }
    }
  },
  methods: {
    btn () {
      this.info.isShow = true
    },
    getid (id) {
      this.info.isShow = true
      this.info.isEdit = true
      this.$refs.getOne.getOne(id)
    }
  },
  components: {
    Add, List
  }
}
</script>
<style scoped>
</style>