import axios from "axios"
import qs from "qs"
import Vue from 'vue'

//开发环境
let baseUrl = "/api"

//上线环境 
// let baseUrl = ""

Vue.prototype.$imgurl = 'http://localhost:3000/'

//响应拦截
axios.interceptors.response.use((res) => {
	console.group("====本次请求的路径:" + res.config.url)
	console.log(res);
	console.groupEnd("====请求结束")
	return res
})

// ==========菜单管理=======
//菜单添加
export const menuadd = (form) => {
	return axios({
		url: baseUrl + '/api/menuadd',
		method: "post",
		data: qs.stringify(form)
	})
}
//菜单获取
export const menuinfo = (id) => {
	return axios({
		url: baseUrl + '/api/menuinfo',
		method: 'get',
		params: { id: id }
	})
}
//菜单列表
export const menulist = () => {
	return axios({
		url: baseUrl + '/api/menulist',
		method: 'get',
		params: { istree: true }
	})
}
//菜单修改
export const menuedit = (form) => {
	return axios({
		url: baseUrl + '/api/menuedit',
		method: 'post',
		data: qs.stringify(form)
	})
}
//菜单删除
export const menudelete = (form) => {
	return axios({
		url: baseUrl + "/api/menudelete",
		method: "post",
		data: qs.stringify(form)
	})
}



// ==========角色管理==========

//角色添加
export const roleadd = (form) => {
	return axios({
		url: baseUrl + '/api/roleadd',
		method: "post",
		data: qs.stringify(form)
	})
}

//角色列表
export const rolelist = () => {
	return axios({
		url: baseUrl + "/api/rolelist",
		method: "get",
	})
}

//角色获取
export const roleinfo = (id) => {
	return axios({
		url: baseUrl + "/api/roleinfo",
		method: "get",
		params: { id: id }
	})
}

//角色修改
export const roleedit = (form) => {
	return axios({
		url: baseUrl + "/api/roleedit",
		method: "post",
		data: qs.stringify(form)
	})
}

//角色删除
export const roledelete = (form) => {
	return axios({
		url: baseUrl + "/api/roledelete",
		method: "post",
		data: qs.stringify(form)
	})
}



// ==========管理员管理=======
//管理员添加
export const useradd = (form) => {
	return axios({
		url: baseUrl + '/api/useradd',
		method: "post",
		data: qs.stringify(form)
	})
}
//管理员总数
export const usercount = () => {
	return axios({
		url: baseUrl + '/api/usercount',
		method: 'get'
	})
}
//管理员获取
export const userinfo = (uid) => {
	return axios({
		url: baseUrl + '/api/userinfo',
		method: 'get',
		params: { uid: uid }
	})
}
//管理员列表
export const userlist = (form) => {
	return axios({
		url: baseUrl + '/api/userlist',
		method: 'get',
		params: form
	})
}
//管理员修改
export const useredit = (form) => {
	return axios({
		url: baseUrl + '/api/useredit',
		method: 'post',
		data: qs.stringify(form)
	})
}
//管理员删除
export const userdelete = (form) => {
	return axios({
		url: baseUrl + "/api/userdelete",
		method: "post",
		data: qs.stringify(form)
	})
}


// ============商品管理=======
//商品添加
export const cateadd = (form) => {
	let data = new FormData;
	for (let i in form) {
		data.append(i, form[i])
	}

	return axios({
		url: baseUrl + '/api/cateadd',
		method: 'post',
		data: data
	})
}
//商品列表
export const catelist = () => {
	return axios({
		url: baseUrl + '/api/catelist',
		method: 'get',
		params: { istree: true }
	})
}
//商品获取
export const cateinfo = (id) => {
	return axios({
		url: baseUrl + '/api/cateinfo',
		method: 'get',
		params: { id: id }
	})
}
//商品修改
export const cateedit = (form) => {
	let data = new FormData;
	for (let i in form) {
		data.append(i, form[i])
	};
	return axios({
		url: baseUrl + '/api/cateedit',
		method: 'post',
		data: data
	})
}
//商品删除
export const catedelete = (form) => {
	return axios({
		url: baseUrl + '/api/catedelete',
		method: 'post',
		data: qs.stringify(form)
	})
}

// ========商品规格=====
//商品规格添加
export const specsadd = (form) => {
	return axios({
		url: baseUrl + '/api/specsadd',
		method: 'post',
		data: qs.stringify(form)
	})
}
//商品规格总数
export const specscount = () => {
	return axios({
		url: baseUrl + '/api/specscount',
		method: 'get'
	})
}
//商品规格列表
export const specslist = (form) => {
	return axios({
		url: baseUrl + '/api/specslist',
		method: 'get',
		params: form
	})
}
//商品规格获取
export const specsinfo = (id) => {
	return axios({
		url: baseUrl + '/api/specsinfo',
		method: 'get',
		params: { id: id }
	})
}
//商品规格修改
export const specsedit = (form) => {
	return axios({
		url: baseUrl + '/api/specsedit',
		method: 'post',
		data: qs.stringify(form)
	})
}
//商品规格删除
export const specsdelete = (form) => {
	return axios({
		url: baseUrl + '/api/specsdelete',
		method: 'post',
		data: qs.stringify(form)
	})
}

// =======商品管理=======

//商品添加
export const goodsadd = (form) => {
	let data = new FormData;
	for (let i in form) {
		data.append(i, form[i])
	}

	return axios({
		url: baseUrl + '/api/goodsadd',
		method: 'post',
		data: data
	})
}
//商品列表
export const goodslist = (form) => {
	return axios({
		url: baseUrl + '/api/goodslist',
		method: 'get',
		params: form
	})
}
//商品总数
export const goodscount = () => {
	return axios({
		url: baseUrl + '/api/goodscount',
		method: 'get'
	})
}
//商品获取
export const goodsinfo = (id) => {
	return axios({
		url: baseUrl + '/api/goodsinfo',
		method: 'get',
		params: { id: id }
	})
}
//商品修改
export const goodsedit = (form) => {
	let data = new FormData;
	for (let i in form) {
		data.append(i, form[i])
	};
	return axios({
		url: baseUrl + '/api/goodsedit',
		method: 'post',
		data: data
	})
}
//商品删除
export const goodsdelete = (form) => {
	return axios({
		url: baseUrl + '/api/goodsdelete',
		method: 'post',
		data: qs.stringify(form)
	})
}

// =========会员管理=======
//会员列表
export const memberlist = () => {
	return axios({
		url: baseUrl + '/api/memberlist',
		method: 'get'
	})
}

//会员获取（一条）
export const memberinfo = (uid) => {
	return axios({
		url: baseUrl + '/api/memberinfo',
		method: 'get',
		params: { uid: uid }
	})
}

//会员修改
export const memberedit = (form) => {
	return axios({
		url: baseUrl + '/api/memberedit',
		method: 'post',
		data: form
	})
}

//会员注册
export const register = (form) => {
	return axios({
		url: baseUrl + '/api/register',
		method: 'post',
		data: form
	})
}


// ======轮播图管理====
// 轮播图添加
export const banneradd = (form) => {
	let data = new FormData();
	for (let key in form) {
		data.append(key, form[key])
	}
	return axios({
		url: baseUrl + '/api/banneradd',
		method: 'post',
		data: data
	})
}

//轮播图列表
export const bannerlist = () => {
	return axios({
		url: baseUrl + '/api/bannerlist',
		method: 'get'
	})
}
// 轮播图获取
export const bannerinfo = (id) => {
	return axios({
		url: baseUrl + '/api/bannerinfo',
		method: 'get',
		params: { id: id }
	})
}
//轮播图修改
export const banneredit = (form) => {
	let data = new FormData();
	for (let key in form) {
		data.append(key, form[key])
	}
	return axios({
		url: baseUrl + '/api/banneredit',
		method: 'post',
		data: data

	})
}
//轮播图删除
export const bannerdelete = (form) => {
	return axios({
		url: baseUrl + '/api/bannerdelete',
		method: 'post',
		data: qs.stringify(form)
	})
}

