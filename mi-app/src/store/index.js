import Vue from 'vue'
// vue的状态管理器
import Vuex from 'vuex'
import { Dialog } from 'vant';
Vue.use(Vuex)
import { GetCart } from '../api/cart/cart.js'

export default new Vuex.Store({
	// 数据  组件中的data
  state: {
	  goods:[
	  ]
  },
  // 修改数据的方法  //zaistore中 只能在mutations里面修改state的数据
  mutations:{
	  initCart(state,data){
		  // 修改数据
		  state.goods = data
	  },
	  // 删除方法 state:默认的参数 item:要删除的数据
	delCart(state,item){
		// var flag = window.confirm(`确定删除么`)
		Dialog.confirm({
		  title: '标题',
		  message: '确认删除么',
		})
		  .then(() => {
			  var ind = state.goods.findIndex(value=>{
			  	return value.name == item.name
			  })
			  state.goods.splice(ind,1)
		    // on confirm
		  })
		  .catch(() => {
		    // on cancel
		  });
	}  
  },
  // 类似于计算 从现有数据得到新数据
  getters: {
	  'totalNum':function(state){
		var n = 0;  
		state.goods.forEach(item=>{
			if(item.select){
				n+=item.num
			}
		})
		return n;
	  },'totalPrice':function(state){
		var n = 0;  
		state.goods.forEach(item=>{
			if(item.select){
				n+=item.num*item.price
			}
		})
		return n;
	  }
  },
  // 异步的方法  发送请求 定时任务
  
  actions: {
	  // 定义有一个获取购物车的方法
	  // context:默认参数  上下文
 	  getCart(context){
		  GetCart().then(res=>{
			  // 通过调用mutation中的inicart方法  把获取到的数据传过去
			  context.commit('initCart',res.data)
			  })
		  
	  }
  },
  // 模块
  modules: {
  }
})
