<template>
	<div>
		<!-- <h1>登录</h1>
		<p>用户名: <input type="text" v-model="user.userid"></p>
		<p>密&emsp;码: <input type="text" v-model="user.pwd"></p>
		<button @click="login">登录</button> -->
		<h1>登录</h1>
			<van-field v-model="user.userid" placeholder="用户名" />
			  <van-field v-model="user.pwd"type="password"placeholder="密码"/>
			  <van-button type="primary" block @click="login" class="radio">提交</van-button>
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
	.radio{
		width: 90%;
		margin: 0 auto;
		border-radius: .1rem;
	}
	.van-cell{
		border: 1px solid #f70;
		margin: .05rem 0;
		border-radius: .2rem;
	}
</style>
<style scoped="scoped">
	
</style>
