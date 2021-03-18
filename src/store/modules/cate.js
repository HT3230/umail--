import { catelist } from '../../untils/request'

const state = {
	list: []
}

const mutations = {
	changelist (state, arr) {
		state.list = arr
	}
}

const actions = {
	reqChangelist (context) {
		catelist().then(res => {
			context.commit('changelist', res.data.list)
		})
	}
}

const getters = {
	list (state) {
		return state.list
	}
}

export default {
	state,
	mutations,
	actions,
	getters,
	namespaced: true
}