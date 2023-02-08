<template>
	
	<div>
		<h1>我的</h1>
		<div v-if="userInfo.M_LoginID">
			<p>用户名：{{userInfo.M_LoginID}}</p>
			<p>积分：{{userInfo.M_Scores}}</p>
			<button @click="logout">退出</button>
		</div>
		<div v-else>
			<router-link to="/login">登录</router-link> |
			<router-link to="/register">注册</router-link>
		</div>
		
	</div>
</template>

<script>
	import { GetUserInfo,Login } from '../../api/user/user.js'
	export default{
		data(){
			return{
				userInfo:{}
			}
			
		},
		created() {
			GetUserInfo()
			.then(res=>{
				console.log(res)
				if(res.data){
					this.userInfo=res.data
				}
			}).catch(err=>{
				console.error(err)
			})
		},
		methods:{
			logout(){
				Login({dopost:'exit'}).then(res=>{
					alert(res.data.msg)
					if(res.data.status==1){
						this.userInfo={}
					}
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>

<style>
</style>
