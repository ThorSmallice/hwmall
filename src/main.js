import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// axios
import _axios from "./utils/_axios"

// 全局样式重置
import './assets/scss/reset.scss' 
// antd input组件
import { Input } from 'ant-design-vue'; 
Vue.use(Input)

Vue.config.productionTip = false

Vue.prototype.axios = _axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
