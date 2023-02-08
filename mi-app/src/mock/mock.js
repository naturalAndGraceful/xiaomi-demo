//导入mockjs
import Mock from "mockjs";

// 拦截ajax请求  生成数据
// mock()  两个参数  第一个是ajax的url地址
// 第二个是数据  可以使一个方法

// Mock.mock(url,function(){return{})
// Mock.mock(url,{})
// Mock.mock() url 可以使正则表达式
// 可以拦截post get put delete

Mock.mock("/myapi/user", function(opt){
	console.log('后端',opt)
	return{name:"张三",age:17}
})

Mock.mock("/myapi/user1", {name:"李四",age:20})

Mock.mock(/\/myapi\/user2/,function(opt){
	console.log("后端",opt)
	return {name:"张三",age:16}
})


// mockjs 可以给我们生成什么样的数据
Mock.mock('/myapi/list',function(){
	return Mock.mock({
		"list|10":[{
			msg:'请求成功',
			status:0,
			
			"age|1-150":1,  //number
			"money|4000-10000.1-2":1, //.后面代表小数点后跟几位
			// 可以写正则
			"tel":/^15\d{9}/,
			"start|4-6":"❤",  //重复范围
			"name":'@cname'  ,//中文名字
			"isAdlut|1-2":true,  //布尔值
			"date":"@date",   //日期
			"time":"@time" ,    //时间
			"address":"@county(true)"  ,//带参数表示完整地区
			
			// 随机选一个数组项
			"friend|1":["小李","张三","小明","小华"],
			// 重复数组
			"friend1|1-2":["小李","张三","小明","小华"],
			// 随机抽一个对象
			'obj|1':{"name":'李四',"age":18,"eyes":2},
			// 随机抽2-4个
			'obj2|2-4':{"name":'李四',"age":18,"eyes":2,"leg":2},
			"pic":function(){
				return Mock.Random.dataImage('200×100',this.name)
			}
		}],
	})
})
