// 用于存放请求方法 封装一个axios

// 为什么要封装axios
// 1.统一请求默认配置
// 2.可以扩展axios jsonp /get post delete
// 3.可以拦截请求和响应  方便作家在提示  token权限
// 4.请求的集中管理

// 封装axios的几个步骤 axios qs jsonp
// 0 导入
import axios from 'axios'
import qs from "qs"
import jsonp from "jsonp"
// 1.创建实例
var request=axios.create({
	baseURL:"/", //默认的url 请求域名
	timeout:5000,//请求超时
	headers:{ 
		post:{
			// "Content-type":"application/x-www-form-urlencoded"
		}
	}
})
// 2.配置拦截
// 请求开始
request.interceptors.request.use(
function(config){
	// console.log("开始加载",config)
	return config
},
// promise 里面有两个参数 reject resolve
function(err){
	return Promise.reject(err)
})
// 请求结束
request.interceptors.response.use(
function(res){
	// console.log("结束加载",res)
	return res
},
// 处理错误
function(err){
	return Promise.reject(err)
})
// 3.写一个扩张方法
// jsonp 本身是一个发送请求的工具  就是以json的格式发送请求
request.jsonp=function(url,opts){
	// 自己写一个promise
	return new Promise((resolve,reject)=>{
		jsonp(url,opts,function(err,data){
			if(err){reject(err)}
			if(data){resolve(data)}
		})
	})
}
export default request;