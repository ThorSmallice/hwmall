import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../utils/_axios'

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

        // checkArr: [],   
        /* 
            选中要结算的商品列表
        */
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
        },
        // 更新购物车商品的数量
        updataCarItemNum(state,data) {
            // 找到要更新数量的商品 
            state.userInfo.buyCar.forEach(item => {
                if (item.id === data.id) {
                    item.num = data.num
                }
            })
            // 更新完后存储用户最新信息
            window.sessionStorage.setItem("userInfo", JSON.stringify(state.userInfo)); 
        },
        // // 更新选中结算的商品列表
        // updataCheckArr (state, data) {
        //     state.checkArr = data
        // }
    },
    actions: { 
        // 请求购物车信息
        getCarList(ctx,id) { 
            // 获取购物车列表 更新到vuex
            axios.get('/api/shoppingCart', {
                params :{
                    "project_id" : id
                }
            }).then(res => { 
                ctx.commit("updataCar",res.result)
            })
        },
    },
})
