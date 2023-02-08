<template>
	<div id="home">
		<div class="header">
			<div class="logo">
				<img src="../assets/logo.png" width="24">
			</div>
			<input type="text" placeholder="搜索关键字" class="head_inp">
			<div class="btn">
				<img src="../assets/user.png" width="24">
			</div>
		</div>

		<div class="subheader">
			<div class="up">
				<div class="wrap">
					<div class="item" 
					:class="{'active':tabCurrent==index}" 
					v-for="(item,index) in tabs" 
					:key="item.page_id" 
					@click="tabCurrent=index">{{item.name}}</div>
				</div>
				<div class="arrow" @click="showDown=!showDown" 
				
				:class="{'isDown':showDown}">
					<img src="../assets/arrow.png" alt="" width="24">
				</div>
			</div>
			
			<div class="down" v-show="showDown">
				<div class="title">全部</div>
				<div class="btns">
					<div class="btn_item"
					 :class="{'active':tabCurrent==index}" 
					 v-for="(item,index) in tabs" 
					 @click="tabCurrent=index,showDown=false"
					 :key="item.page_id">{{item.name}}</div>
				</div>
			</div>
		</div>
	
	<div class="pages">
		<Page v-for="(item,index) in tabs" 
			:key="item.page_id"
			v-show="tabCurrent==index"
			:item = "item"
		>
			
		</Page>
	</div>
	</div>
</template>

<script>
	// 引入组件
	import Page from '@/components/Page.vue'
	export default {
		data() {
			return {
				showDown: false,
				tabs: [],
				// 代表tabs的选中状态
				tabCurrent: 0
			}
		},
		// 生命周期函数  代表创建完成  自动执行
		created() {
			this.getHomeTabs()
		},
		// 注册组件
		components:{
			Page
		},
		methods: {
			getHomeTabs() {
				// 使用axios 发送post
				// axios 本身支持promise
				//             .then .catch
				// axios.post(url body,config/header) 
				this.$http.post(
					// 请求的接口 path
					"/v1/home/page",
					// 请求的参数
					"client_id=180100031051&channel_id=&webp=1&page_type=home", {
						headers: {
							"content-type": "application/x-www-form-urlencoded"
						}
					}
				).then(res => {
					console.log(res)
					// 赋值 拿数据
					this.tabs = res.data.data.tabs
				}).catch(err=>{
					console.log(err)
				})
			}
		}
	}
</script>
<style scoped="scoped">
	.subheader,
	.header {
		background-color: #f0f0f0;
		height: .88rem;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.subheader {
		top: .88rem;
	}

	.header {
		height: .88rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.logo,
	.btn {
		height: .88rem;
		line-height: .88rem;
		padding: 0 .25rem;
	}

	.head_inp {
		line-height: .58rem;
		height: .58rem;
		padding: 0 .1rem;
		flex: 1;
	}

	.subheader .up {
		display: flex;
		height: .88rem;
	}

	.subheader .wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		height: .88rem;
		flex: 1;
	}

	.arrow img {
		transition: all ease .7s;
	}

	.wrap .item {
		margin: 0 .3rem;
		color: #484848;
		font-size: .24rem;
		line-height: .88rem;
		border-bottom: 2px solid transparent;
	}

	.item.active {
		color: #FF7700;
		border-bottom: 2px solid #FF7700;
	}

	.isDown img {
		transform: rotate(180deg);
	}

	.arrow {
		width: .88rem;
		height: .88rem;
		line-height: .88rem;
	}

	/* .arrow img{
		transform: rotate(180deg);
	} */
	.down {
		width: 100%;
		position: absolute;
		background-color: #f0f0f0;
		top: .88rem;
		z-index: 2;
	}

	.down .btns {
		display: flex;
		flex-wrap: wrap;
	}

	.down .btn_item {
		box-sizing: border-box;
		width: 1.6rem;
		border-radius: .04rem;
		border: thin solid #ccc;
		background-color: #fff;
		height: .5rem;
		line-height: .5rem;
		text-align: center;
		margin-left: .15rem;
		margin-bottom: .15rem;
	}

	.btn_item.active {
		border: 1px solid #FF7700;
		background-color: #fde0d5;
		color: #ff6700;
	}

	.down .title {
		background-color: #f0f0f0;
		line-height: .88rem;
		padding-left: .2rem;
		font-size: .24rem;
		color: #333;
		margin-top: -0.88rem;
		width: 82%;
	}
	.pages{
		position: absolute;
		top: 1.76rem;
		bottom: 0;
		width: 100%;
		background-color: #fff;
		overflow-y: auto;
	}
</style>
