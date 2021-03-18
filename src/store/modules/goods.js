import { goodslist, goodscount } from '../../untils/request'

const state = {
	list: [],
	size: 4,
	page: 1,
	count: 0
}

const mutations = {
	changelist (state, arr) {
		state.list = arr
	},
	changecount (state, num) {
		state.count = num
	},
	changepage (state, num) {
		state.page = num
	}
}

const actions = {
	reqChangelist (context, num) {
		console.log(context);
		context.state.page = num ? num : context.state.page
		goodslist({ page: context.state.page, size: context.state.size }).then(res => {
			if (res.data.list == null && context.state.page > 1) {
				context.commit('changepage', context.state.page - 1)
				context.dispatch('reqChangelist')
			}
			context.commit('changelist', res.data.list)
		})
	},
	reqChangecount (context) {
		goodscount().then(res => {
			context.commit('changecount', res.data.list[0].total)
		})
	},
	reqChangepage (context, num) {
		context.commit('changepage', num)
	}
}

const getters = {
	list (state) {
		return state.list
	},
	count (state) {
		return state.count
	},
	page (state) {
		return state.page
	},
}
export default {
	state, mutations, getters, actions,
	namespaced: true
}