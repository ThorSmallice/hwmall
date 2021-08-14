import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {
            id: "", //项目id
            username: "", // 用户昵称
            token: "",    // 用户token
            project_id: "", // 项目id
        }
    },
    mutations: {
        // 更新用户信息 
        updateUserInfo(state,data) {
            state.userInfo = data
        }
    },
    actions: {
    },
})
