// 这个文件是vue的配置文件  修改配置文件需要重启服务 
  // 固定写法  抛出
module.exports={
	// 在开放环境的配置
	// 配置代理跨域  测试 学习时使用
	devServer:{
		// 监听端口
		// port:"8080",
		// 编译完成后自动打开浏览器
		// open:true, 
		// proxy 是代理的配置项
		proxy:{
			// 匹配规则 以这个开头的请求  都要遵循这个配置项
			'/v1':{
				// 接口地址
				target:"https://m.mi.com/",  //认亲
				// 是否允许跨域
				changeOrigin:true,  //进家门
				onProxyReq(proxyReq,req,res){ //配置请求信息
					// 设置请求头
					proxyReq.setHeader("referer","https://m.mi.com/")
				}
			},
			"php":{
				target:"http://www.520mg.com/",
				changeOrigin:true
			}
		}
	}
}