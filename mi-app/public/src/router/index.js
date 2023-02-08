import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ball from '../views/Ball.vue'
import Cate from '../views/Cate.vue'
import Cart from '../views/Cart.vue'
// import User from '../views/user/User.vue'
// import Login from '../views/user/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/ball',
    name: 'Ball',
    component:Ball
  },
  {
    path: '/cate',
    name: 'Cate',
    component:Cate
  },
  {
    path: '/cart',
    name: 'Cart',
    component:Cart
  },
  {
    path: '/user',
    name: 'User',
	// 路由懒加载
    component:()=>import('../views/user/User')
  },
  {
    path: '/login',
    name: 'Login',
    component:()=>import('../views/user/Login')
  },
  {
    path: '/register',
    name: 'Register',
    component:()=>import('../views/user/Register')
  }
]

const router = new VueRouter({
  routes
})

export default router
