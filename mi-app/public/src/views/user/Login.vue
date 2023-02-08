<template>
	<div>
		<h1>登录</h1>
		<p>用户名: <input type="text" v-model="user.userid"></p>
		<p>密&emsp;码: <input type="text" v-model="user.pwd"></p>
		<button @click="login">登录</button>
	</div>
</template>

<script>
	import {Login} from "../../api/user/user.js"
	export default{
		data(){
			return{
				user:{
					fmdo:'login',
					dopost:'login',
					userid:'',
					pwd:''
				}
			}
		},
		methods:{
			login(){
				Login(this.user).then(res=>{
					console.log(res)
					// 登录提醒弹窗
					alert(res.data.msg)
					if(res.data.status==1){
						// 登录成功条转
						this.$router.replace('/user')
					}
				}).catch(err=>{
					console.error(err)
				})
			}
		}
	}
</script>

<style>
</style>
