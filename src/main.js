import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 图片懒加载
import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
    preLoad: 1,
    loading: require('./assets/image/loading-svg/loading-bars.svg'),
    attempt: 2,
    listenEvents: [ 'scroll' ]
})
// axios
import _axios from "./utils/_axios"
Vue.prototype.axios = _axios;

// 全局样式重置
import './assets/scss/reset.scss'

// antd input组件
import { Input, Message } from 'ant-design-vue';
Vue.use(Input)

Message.config({
    top: `150px`
})

Vue.prototype.$message = Message

Vue.config.productionTip = false

_axios.interceptors.request.use((req) => {
    /* 请求前查看本地有没有用户信息 如果有，设置请求头 把token 加进去
        如果没有  跳转登录页
    */
    let userInfo = window.sessionStorage.getItem("userInfo");
    // 用户信息存在 请求头添加token
    userInfo && (userInfo = JSON.parse(userInfo)) && (req.headers["x-token"] = userInfo.token);
    return req
}, err => {
    return Promise.reject(err.response)
});

_axios.interceptors.response.use(function (response) {
    if (response.status === 200) {
        return Promise.resolve(response.data)
    }
    // console.log(response);
    // return Promise.resolve(response);
}, function (err) {
    // console.log(err.response);
    if(err.response.status === 401) {
        Message.warning("登录状态失效或未登录~,2秒后跳转登录页面~");
        store.commit("updateUserInfo",null)
        // window.sessionStorage.clear();
        setTimeout(() => {
            router.push("/log/login");
        },2000)
    }
    return Promise.reject(err.response);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


