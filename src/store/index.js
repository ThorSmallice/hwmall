import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: null,
        /* {
            id: "", //项目id
            username: "", // 用户昵称
            token: "",    // 用户token
            project_id: "", // 项目id
            buyCar:[] // 购物车列表
        } */
    },
    mutations: {
        // 更新用户信息 
        updateUserInfo(state,data) {
            state.userInfo = data
            // 存储用户信息
            window.sessionStorage.setItem("userInfo", JSON.stringify(data));
        },  
        // 更新购物车列表
        updataCar(state,data) {
             
            state.userInfo.buyCar = data
            // 更新用户信息
            window.sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        }
    },
    actions: { 
    },
})
