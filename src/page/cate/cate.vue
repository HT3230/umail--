<template>
  <div>
    <el-button type="primary" @click="btn">添加</el-button>
    <Add :info='info' ref='getOne' />
    <List @getOne='getOne' />
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
        isEdit: false
      }
    }
  },
  methods: {
    btn () {
      this.info.isShow = true
    },
    getOne (id) {
      this.info.isShow = true;
      this.info.isEdit = true;
      this.$refs.getOne.getinfo(id)
    }
  },
  components: {
    Add, List
  }
}
</script>
<style scoped>
</style>