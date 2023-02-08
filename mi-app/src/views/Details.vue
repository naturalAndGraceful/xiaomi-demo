<template>
	<div class="details" v-if="view.goods_info">
		<!-- 头部导航 -->
		<div class="header">
			<div class="back" @click="$router.back()">
				<van-icon name="arrow-left" class="vant-icon" />
			</div>
			<div class="share">
				<van-icon name="share-o" class="vant-icon" />
			</div>
		</div>
		<!-- 轮播图开始 -->
		<van-swipe @change="onChange" class="banner-swipe">
		  <van-swipe-item v-for="(item,index) in view.goods_info[current].gallery_v3">
			  <img :src="item.img_url" alt="" width="100%">
		  </van-swipe-item>
		  <template #indicator>
		    <div class="custom-indicator">{{ cur + 1 }}/ {{view.goods_info[current].gallery_v3.length}}</div>
		  </template>
		</van-swipe>
		<!-- 轮播图结束 -->
		<div class="price">
			$ <span>{{view.goods_info[current].market_price}}</span>
		</div>
		<div class="title">
			{{view.goods_info[current].name}}
		</div>
		<!-- 商品导航 -->
		<van-goods-action>
		  <van-goods-action-icon icon="chat-o" text="客服" badge="5" />
		  <van-goods-action-icon icon="cart-o" text="购物车" :badge="$store.getters.totalNum" />
		  <van-goods-action-icon icon="shop-o" text="店铺" badge="12" />
		  <van-goods-action-button type="warning" text="加入购物车" />
		  <van-goods-action-button type="danger" text="立即购买" />
		</van-goods-action>
	</div>
	<div v-else>
		<van-empty description="等不到就别等了" />
	</div>
</template>

<script>
import {GetView} from '../api/details/details.js'
//import bus from '../utils/bus.js'
export default{
	data(){
		return{
			view:{},
			// 第几个goodsinfo
			current:0,
			// 第几章轮播图
			cur:0
		}
	},
	created(){
		// 改变showTabs false 隐藏底部导航
		// this.$parent.showTabs=false;
		//bus.$emit('tabchange',false)
		this.getView({
			client_id: 180100031051,
			channel_id: '',
			webp: 1,
			commodity_id: this.$route.params.id,
			pid: this.$route.params.id,
			saleMode: ''
		})
	},
	// 销毁之前
	beforeDestroy(){
		// 改变showTabs true 显示底部导航
		 this.$parent.showTabs=true;
		//bus.$emit('tabchange',true)
	},
	methods:{
		getView(data){
			GetView(data,{jiazai:{message:'正在加载...'}})
			.then(res=>{
				console.log(res.data.data)
				this.view = res.data.data
			}).catch(err=>{
				console.error(err)
			})
		},
		onChange(index) {
			this.cur = index;
		},
	}
}


</script>
<style>
	.vant-icon{
		color: #fff !important;
	}
</style>
<style scoped="scoped">
	.price{
		font-size: .36rem;
		color: #f70;
		padding: 0 .15rem;
		line-height: .72rem;
	}
	.price>span{
		font-size: .48rem;
		font-weight: 800;
	}
	.title{
		font-size: .32rem;
		color: #333;
		font-weight: 800;
		padding: 0 .15rem;
		
	}
	.details{
		position: relative;
	}
	.header{
		position: absolute;
		line-height: .88rem;
		height: .88rem;
		display: flex;
		justify-content: space-between;
		left: 0;
		right: 0;
		top: 0;
		width: 100%;
		align-items: center;
		padding: 0 0.15rem;
		z-index: 2;
		background-color: transparent;
	}
	.header>div{
		background-color: rgba(0,0,0,0.3);
		width: 0.55rem;
		height: 0.55rem;
		border-radius: 0.55rem;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	  .custom-indicator {
	    position: absolute;
	    right: 5px;
	    bottom: 5px;
	    padding: 2px 5px;
	    font-size: 12px;
	    background: rgba(0, 0, 0, 0.1);
		
	  }
</style>
