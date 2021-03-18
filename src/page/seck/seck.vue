<template>
  <div>
    <button @click='btn' ref='btns'>{{msg}}</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '我是旧的数据'
    }
  },
  methods: {
    btn () {


      this.msg = '我是新的数据'
      console.log(this.$refs.btns.innerHTML);
      this.$nextTick(() => {
        console.log(this.$refs.btns.innerHTML);
      })
    }
  }
}
</script>
<style scoped>
</style>