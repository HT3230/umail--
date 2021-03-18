<template>
  <div>

    <el-container class="index">
      <el-aside width="200px" class="el-aside ">
        <el-col :span="24">

          <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#2a2220" text-color="#fff" active-text-color="#ffd04b" unique-opened router>
            <el-menu-item index="home"><i class="el-icon-menu"></i> 首页</el-menu-item>

            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-tools"></i>
                <span>系统</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="menu">菜单管理</el-menu-item>
                <el-menu-item index="role">角色管理</el-menu-item>
                <el-menu-item index="manage">管理员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-goods"></i>
                <span> 商城管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="cate">商品分类</el-menu-item>
                <el-menu-item index="specs">商品规格</el-menu-item>
                <el-menu-item index="goods">商品管理</el-menu-item>
                <el-menu-item index="member">会员管理</el-menu-item>
                <el-menu-item index="banner">轮播图管理</el-menu-item>
                <el-menu-item index="seck">秒杀活动</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-container>
        <el-header class="el-header">
          <div class="right"> admin
            <span class="span">退出</span>
          </div>
        </el-header>
        <el-main class="el-main">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="el-main">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import { routerlist } from "../../router/index.js"
export default {
  data () {
    return {
      // routerlist: routerlist
    }
  },
  mounted () {

  },
}
</script>
<style scoped>
.index {
  width: 100vw;
  height: 100vh;
}
.el-aside {
  background: #2a2220;
}
.el-header {
  background: #d1c0b3;
}
.right {
  float: right;
  line-height: 60px;
}
.span {
  font-size: 16px;
}
.el-main {
  margin-bottom: 10px;
}
</style>
