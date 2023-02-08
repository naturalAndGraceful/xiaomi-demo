<template>
	<div>
		<h1>注册</h1>
		<p>用户名: <input type="text" v-model="user.userid"></p>
		<p>密&emsp;码: <input type="password" v-model="user.userpwd"></p>
		<p>邮&emsp;箱: <input type="text" v-model="user.email"></p>
		<button @click="register">注册</button>
	</div>
</template>

<script>
	import {Register} from "../../api/user/user.js"
	export default{
		data(){
			return{
				user:{
					userid:'',
					userpwd:'',
					email:''
				}
			}
		},
		methods:{
			register(){
				Register(this.user).then(res=>{
					console.log(res)
					alert(res.data.msg)
					if(res.data.status==1){
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
