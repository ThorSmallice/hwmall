import Vue from 'vue'
import VueRouter from 'vue-router' 

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home', 
    component: () => import('../pages/Home.vue')
  },
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
  }
]

const router = new VueRouter({
  routes
})

export default router
