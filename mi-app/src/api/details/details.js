// 引入封装好的request
import request from "@/utils/request.js"
import qs from 'qs'
// 创建一个方法 用来发送请求
function GetView(data,peizhi){
	// 返回一个promise对象
	return new Promise((resolve,reject)=>{
		request.post(  //接收url 和 请求参数
		'/v1/miproduct/view',
		qs.stringify(data),
		peizhi
		).then(
		res=>{resolve(res)}
		).catch(
		err=>{reject(err)}
		)
	})
}
export { GetView }