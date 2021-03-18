<template>
  <div class="contains">
    <div class="box">
      <h1>登录</h1>
      <div class="inp">
        <el-input placeholder="请输入账号" v-model="input" clearable>
        </el-input>
      </div>
      <div class="inp">
        <el-input placeholder="请输入密码" v-model="password" show-password clearable></el-input>
      </div>
      <div class="inp">
        <el-button type="primary" class="btn">登 录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      password: ''
    }
  }
}
</script>
<style scoped>
.contains {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #433455, #603d2f);
}
.box {
  width: 620px;
  height: 370px;
  background: #fff;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -75%);
  text-align: center;
}
h1 {
  text-align: center;
  height: 80px;
  line-height: 80px;
  font-size: 40px;
}
.inp {
  width: 60%;
  height: 70px;
  display: inline-block;
}
.btn {
  width: 100%;
  font-size: 20px;
}
</style>