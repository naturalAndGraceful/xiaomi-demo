import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Ball from '../views/Ball.vue'
import Cate from '../views/Cate.vue'
// import Cart from '../views/Cart.vue'
import About from '../views/About.vue'
// import Details from '../views/Details.vue'
// import User from '../views/user/User.vue'
// import Login from '../views/user/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
	meta:{
		keep:true
	}
  },
  {
    path: '/ball',
    name: 'Ball',
    component:Ball,
	meta:{
		keep:true
	}
  },
  {
    path: '/cate',
    name: 'Cate',
    component:Cate,
	meta:{
		keep:true
	}
  },
  {
    path: '/about',
    name: 'About',
    component:About,
	meta:{
		keep:true
	}
  },
  {
    path: '/cart',
    name: 'Cart',
   component:()=>import('../views/Cart'),
	meta:{
		nofoot:true
	}
  },
  {
    path: '/user',
    name: 'User',
	// 路由懒加载
    component:()=>import('../views/user/User')
  },
  {
    path: '/details/:id',
    name: 'Details',
  	// 路由懒加载
    component:()=>import('../views/Details'),
		meta:{
			nofoot:true
		}
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
