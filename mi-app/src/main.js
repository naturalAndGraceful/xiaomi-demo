import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css';
// 全局引入一个初始化css
import "./assets/css/reset.css"
// 全局引入一个转换成移动端rem的工具
import "./assets/js/flexible.min.js"
//全局引入axios 类似于ajax  用于发送网络请求
// from后面不加路径的话 会自动node_modules文件夹下找
import axios from "axios"

// 全局导入mockjs配置
import "./mock/mock.js"
// axios的默认配置
// 给post写了一个默认的请求头
// axios.defaults.headers.post['content-type']='application/x-www-form-urlencoded';

// 请求超时的配置
axios.defaults.timeout=5000

// 配置默认的请求域名
axios.defaults.baseURL="/"
// 联调
// 联合调试

// 请求拦截
// 请求开始
axios.interceptors.request.use(
function(config){
	// console.log("开始加载",config)
	return config
},
// promise 里面有两个参数 reject resolve
function(err){
	
	return Promise.reject(err)
})
// 请求结束
axios.interceptors.response.use(
function(res){
	// console.log("结束加载",res)
	return res
},
// 处理错误
function(err){
	return Promise.reject(err)
})

// 把axios 挂载到vue全局的原型中的$http方法上
// 所有的vue实例 (所有组件) 都拥有$http方法
Vue.prototype.$http=axios

Vue.use(Vant)

Vue.config.productionTip = false

// 全局引入lazyload 懒加载组件 vant组件
import { Lazyload } from 'vant';
// 全局使用
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
