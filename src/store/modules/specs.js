import { specslist, specscount } from '../../untils/request'

const state = {
	list: [],
	size: 2,
	page: 1,
	count: 0
}

const mutations = {
	changelist (state, arr) {
		state.list = arr
	},
	changepage (state, num) {
		state.page = num
	},
	changecount (state, num) {
		state.count = num
	}
}

const actions = {
	reqChangelist (context, num) {
		context.state.page = num ? num : context.state.page
		specslist({ size: context.state.size, page: context.state.page }).then(res => {
			res.data.list.forEach(item => {
				item.attrs = JSON.parse(item.attrs)
			});
			if (res.data.list.length == 0 && context.state.page > 1) {
				context.commit('changepage', context.state.page - 1),
					context.dispatch('reqChangelist')
			}
			context.commit('changelist', res.data.list)
		})
	},
	reqChangecount (context) {
		specscount().then(res => {
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
	page (state) {
		return state.page
	},
	size (state) {
		return state.size
	},
	count (state) {
		return state.count
	}
}

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
}