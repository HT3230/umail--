import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export const routerlist = [{
  path: "role",
  component: () => import("../page/role/role"),
  name: "角色管理"
}, {
  path: "manage",
  component: () => import("../page/manage/manage"),
  name: "管理员管理"
}, {
  path: "cate",
  component: () => import("../page/cate/cate"),
  name: "商品分类"

}, {
  path: "specs",
  component: () => import("../page/specs/specs"),
  name: "商品规格"

}, {
  path: "goods",
  component: () => import("../page/goods/goods"),
  name: "商品管理"

}, {
  path: "member",
  component: () => import("../page/member/member"),
  name: "会员管理"

}, {
  path: "banner",
  component: () => import("../page/banner/banner"),
  name: "轮播图管理"

}, {
  path: "seck",
  component: () => import("../page/seck/seck"),
  name: "秒杀管理"

}, {
  path: "menu",
  component: () => import("../page/menu/menu"),
  name: "菜单管理"

}]
export default new Router({
  routes: [
    {
      path: "/login",
      component: () => import("../page/login/login")
    },
    {
      path: "/",
      component: () => import("../page/index/index"),
      children: [{
        path: "home",
        component: () => import("../page/home/home"),
      }, {
        path: "",
        component: () => import("../page/home/home"),
      },
      ...routerlist]
    }
  ]
})
