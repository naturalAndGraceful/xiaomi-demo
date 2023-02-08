<template>
	<div class="category">
		<div class="header">
			<input type="text" placeholder="搜索商品名称">
		</div>
		<div class="content">
			<div class="left" >
			<p 
			v-for="(item,index) in cateMune"
			:class="{'cate_active':cateCurrent==index}"
			:key="item.category_id"
			@click="cateCurrent=index,getInfo(item.category_id)"
			class="cate_mune"
			>{{item.category_name}}</p>
			
			</div>
			<div class="right">
				<div v-for="item in cateInfo">
					<div class="cateItem"
					v-if="item.view_type=='cells_auto_fill'">
						<img :src="item.body.items[0].img_url" 
						:style="{
							'height':'1.466rem',
							'width':'4.89rem'
						}">
					</div>
					<div class="cateItem"
					v-if="item.view_type=='category_title'">
						<span class="cate_title">{{item.body.category_name}}</span>
					</div>
					<div class="cateItem"
					v-if="item.view_type=='category_group'">
					
					<div v-if="item.body.product_list">
						<div class="category_group" v-for="groupItem in item.body.product_list" >
							<img :src="groupItem.puzzle_url"
							:style="{
								    'width':' 1.33rem',
								    'height': '1.33rem'
							}">
							<div >
							<span>{{groupItem.name}}</span>
							<div style="display: flex;align-items: center;margin-top: 5px;">
							<p style="margin-right: 5px;">{{groupItem.price}}</p>
							<p v-if="groupItem.labels">
							<span v-for="items in groupItem.labels" style="margin-right: 5px;">{{items}}</span></p>
							</div>
							</div>
						</div>
						</div>
						<div v-if="item.body.items" style="display: flex; text-align: center;flex-wrap: wrap;">
							<div class="category_groups" v-for="groupItems in item.body.items">
								<img :src="groupItems.img_url"
								:style="{
									    'width':' 1.33rem',
									    'height': '1.33rem'
								}">
								<p>{{groupItems.product_name}}</p>
							</div>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { GetCategory} from "../api/category/category.js"
	export default{
		data(){
			return {
				cateMune:[],
				cateCurrent:0,
				cateInfo:[]
			}
		},
		created(){
			this.getCateMenu(data);
			this.getInfo(-1);
		var data={client_id:180100031051,channel_id:"",webp:1}
		},
		methods:{
			// getCateMenu(){
			// 	// 发送请求
			// 	this.$http.post(
			// 	// 请求url
			// 	"/v1/home/category_v2",
			// 	// 请求参数
			// 	"client_id=180100031051&channel_id=19460.8888&webp=1"
				
			// 	).then(res=>{
			// 		// console.log(res.data.data)
			// 		this.cateMune=res.data.data
					
			// 	}).catch(err=>{
			// 		console.error(err)
			// 	})
			// },
			getCateMenu(data){
				GetCategory(data).then(res=>{
					// console.log(res.data.data)
					this.cateMune=res.data.data
				}).catch(err=>{
					console.error(err)
				})
			},
			// getInfo(cat_id){
			// 	this.$http.post(
			// 	"/v1/home/category_v2",
			// 	 "client_id=180100031051&channel_id=19460.8888&webp=1&cat_id="+cat_id
				
			// 	).then(res=>{
			// 		console.log(res.data.data[0].category_list)
			// 		this.cateInfo=res.data.data[0].category_list
			// 	}).catch(err=>{
			// 		console.error(err)
			// 	})
			// }
			getInfo(cat_id){
				var data={client_id:180100031051,channel_id:19460.8888,webp:1,cat_id:cat_id}
				GetCategory(data).then(res=>{
					this.cateInfo=res.data.data[0].category_list
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.header{
		position: absolute;
		width: 100%;
		height: 0.88rem;
		left: 0;
		top: 0;
		background-color: #f0f0f0;
		display: flex;
		align-items: center;
		padding: 0 0.3rem;
	}
	.header input{
		height: 0.6rem;
		border-radius: 0.6rem;
		background-color: #fff;
		border: none;
		flex: 1;
		padding: 0 0.15rem;
	}
	.content{
		position: absolute;
		bottom: 0;
		top: 0.88rem;
		left: 0;
		width: 100%;
		display: flex;
	}
	.left{
		width: 25%;
		flex-basis: 25%;
		overflow-y: auto;
		background-color: #f0f0f0;
	}
	.right{
		width: 75%;
		flex-basis: 75%;
		overflow-y: auto;
	}
	.cate_mune{
		width: 100%;
		height: 0.9rem;
		font-size: 0.24rem;
		line-height: #333;
		background-color:#fff;
		text-align: center;
	}
	.cate_mune.cate_active{
		font-weight: bold;
		position: relative;
	}
	.cate_mune.cate_active:after{
		content: "";
		display: block;
		width: 0.05rem;
		height: 0.28rem;
		background-color: #f70;
		position: absolute;
		left: 0;
		top: 0.04rem;
	}
	.cate_title{
		background: #fff;
		font-size: .28rem;
		text-align: left;
		font-weight: 700;
		margin-top: .3rem;
		height: .63rem;
		line-height: .63rem;
		overflow: hidden;
		color: #333;	         
	}
	.category_group{
		font-size: 0.16rem;
		display: flex;
		align-items: center;
	}
	.category_groups{
		width: 33%;
		font-size: 0.16rem;
	}
</style>
