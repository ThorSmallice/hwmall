import Vue from 'vue'
import VueRouter from 'vue-router' 
import {Message} from 'ant-design-vue';
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home', 
    component: () => import('../pages/Home.vue'),
    redirect: '/index',
    children: [
        // 主页 
        {
            path: 'index',
            name: 'Index',
            component: () => import('../pages/Home/Index.vue')
        },
        // 产品
        {
            path: 'product/:id',
            name: 'Product',
            component: () => import('../pages/Home/Product.vue')
        },
        // 购物车
        {
            path: 'car',
            name: 'Car',
            component: () => import('../pages/Home/Car.vue')
        }
    ]
  },
  // 登录 注册
  {
    path: '/log',
    name: 'Log', 
    component: () => import('../pages/Log.vue'),
    redirect:'/log/login',
    children: [
        {   
            path: 'login',
            name: 'login', 
            component: () => import('../pages/Login/login.vue'),
        },
        {
            path: 'register',
            name: 'Register', 
            component: () => import('../pages/Login/Register.vue') 
        }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    const ignore = [ '/log', '/log/login', '/log/register'];
    if (ignore.includes(to.path)) {
        next();
    }else {
        const userInfo = window.sessionStorage.getItem('userInfo'); 
        if (!userInfo) {
            Message.warning("请先登录账号~")
            next('/log/login')
        }else{
            next()
        }
    } 
})

export default router
