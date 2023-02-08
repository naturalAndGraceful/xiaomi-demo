// 存放分类模块  请求数据的方法 axios
// 引入request 封装好的axios
import request from "@/utils/request.js"
import qs from "qs"
// 定义一个获取分类的方法
function GetCategory(data,config){
	return new Promise((resolve,reject)=>{
		request.post(
			"/v1/home/category_v2",
			qs.stringify(data),
			config
		).then(res=>{
			resolve(res)
		}).catch(err=>{
			reject(err)
		})
	})
}
function GetCategory2(data1){
	return new Promise((resolve,reject)=>{
		request.post(
		"v1/home/page",
		qs.stringify(data1)
		).then(res=>{
			resolve(res)
		}).catch(err=>{
			reject(err)
		})
	})
}
export { GetCategory,GetCategory2 }