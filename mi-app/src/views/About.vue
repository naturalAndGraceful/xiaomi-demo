<template>
	<div>
		<h1>关于我们页面</h1>
		<!--
			获取页面数据的方法：
			1、通过网站请求  跨域代理获取数据
			2、审查元素 复制数据
			3.复制源数据
		-->
		<van-swipe class="my-swipe" :autoplay="3000">
		  <van-swipe-item
			  class="swipe_item"
			  v-for="item in gallery"
			  :key="item.id"
			  :style="{backgroundColor:item.color}"
		  >
			  <img class="swipe_pic" :src="item.picurl"/>
		  </van-swipe-item>
		</van-swipe>
	</div>
</template>

<script>
export default {
	data(){
		return {
			gallery:[
				{id:1,picurl:"http://weeklyreport.moretickets.com/my_file/9c8b79ba-a2ad-4471-80d0-25bffb68da12.jpg",color:"#f0f"},
				{id:2,picurl:"http://weeklyreport.moretickets.com/my_file/f9617c5d-9ffc-4e22-b43b-4e8829fba253.jpg",color:"#f06"},
				{id:3,picurl:"http://weeklyreport.moretickets.com/my_file/fa8f3999-1529-4388-9695-67564d14a975.jpg",color:"#f60"},
				{id:4,picurl:"http://weeklyreport.moretickets.com/my_file/3fa02776-7dd8-496b-8f0a-e5865f3b5b63.jpg",color:"#0f6"},
				{id:5,picurl:"https://img0.tking.cn/mtl/default/img/5WyWsteSZd_.jpg@!750w",color:"#06f"}
			],
		}
	},
	created(){
		this.getUser()
		this.getlist()
	},
	methods:{
		getUser(){
			// mockjs的作用  1：拦截ajax请求  2、生成模拟数据
			//
			this.$http.get('/myapi/user')
			.then(res=>{
				// console.log(res)
			}).catch(err=>{
				console.error(err)
			})
		},
		getlist(){
			this.$http.post('myapi/list')
			.then(res=>{
				console.log(res)
			}).catch(err=>{
				console.error(err)
			})
		}
	}
}
</script>

<style>
.my-swipe{}
.swipe_item{
	width: 100%;
	padding: 0.3rem;
	padding-bottom: 0;
}
.swipe_pic{
	display: block;
	width: 100%;
}
</style>
