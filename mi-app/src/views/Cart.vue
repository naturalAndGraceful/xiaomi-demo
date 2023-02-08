<template>
	<div class="cart" ref="cart">
		<van-nav-bar title="购物车" left-text="" left-arrow @click-left="$router.back()">
		</van-nav-bar>

		<div class="items" v-for="(item,index) in $store.state.goods" :key="index">
			<div class="col-10 sel">
				<van-checkbox v-model="item.select" checked-color="#ee0a24">
				</van-checkbox>
			</div>
			<div class="col-30">
				<img :src="item.img_url" width="80%">
			</div>
			<div class="col-50">
				<h4>{{item.name}}</h4>
				<p style="font-size: .20rem; color: #666; line-height: .3rem;">售价： {{item.price}}元</p>
				<van-stepper v-model="item.num" min="1" :max="item.buy_limit" />

			</div>
			<div class="col-10 del">
				<!-- 通过$store.commit方法调用store中的mutation的方法 -->
				<van-icon name="delete-o" @click="$store.commit('delCart',item)" />
			</div>
		</div>
		<div class="foot">
			<div class="col price">共{{$store.getters.totalNum}}件 金额：<br>{{$store.getters.totalPrice}} 元</div>
			<div class="col" style="background-color: #f4f4f4;" @click="getMoreItem()">继续购物</div>
			<div class="col" style="background-color: #f70;color: #fff;">去结算</div>
		</div>
		<!-- 瀑布流布局 -->
		<div class="box">
			<div class="pbl"></div>
			<div class="pbl pblA"></div>
			<div class="pbl pblB"></div>
			<div class="pbl pblA"></div>
			<div class="pbl"></div>
			<div class="pbl pblA"></div>
			<div class="pbl pblB"></div>
			<div class="pbl pblA"></div>
			<div class="pbl"></div>
			<div class="pbl pblB"></div>
			<div class="pbl pblA"></div>
			<div class="pbl"></div>
			<div class="pbl pblB"></div>
			<div class="pbl"></div>
			<div class="pbl pblB"></div>
			<div class="pbl pblA"></div>
			<div class="pbl"></div>
			<div class="pbl pblB"></div>
			<div class="pbl pblA"></div>
			<div class="pbl"></div>
			<div v-for="(item,index) in len" class="pbl" :class="{'pblA':index%3==0}"></div>
		</div>

	</div>
</template>

<script>
	import {
		watefull
	} from "../utils/wateFull.js"
	export default {
		data() {
			return {
				len: 10,
				// 是否允许加载新数据
				flag:true
			}
		},
		methods: {
			water() {
				watefull('.cart .box', '.pbl', 5, 20)
			},
			reachBottom() {
				// 触底事件
				// 获取到最后一个元素
				var last = [...document.querySelectorAll(".pbl")].pop();
				var winH = window.innerHeight;
				//getBoundingClientRect 返回一个元素对于窗口对象的值的集合
				if (last.getBoundingClientRect().top < winH && this.flag) {
					this.getMoreItem()
				}
			},
			// 加载更多数据
			getMoreItem() {
				this.flag=false;
				setTimeout(() => {
					// 一次增加10条
					this.len += 10
					// dom更新完成后执行的回调
					// 目的重新选择最后一个元素
					this.$nextTick(() => {
						this.water()
						this.flag=true
					})
				},1000)

			}
		},
		// 页面只有在挂载完成首才能获取到节点信息  mounted
		mounted() {
			/**
	    @param1 父元素 
		@param2 子元素		
		@param3 列数 	
		@param4 间距 "px" 
		 */
			this.water()
			// addEventListener:监听事件  resize 窗口改变事件
			window.addEventListener("resize", this.water)
			// this.reachBottom()
			// 监听滚动条事件 实时触发reachBottom
			// $refs:获取已注册的所有ref组件 (或者html)
			this.$refs.cart.addEventListener('scroll',this.reachBottom)
			// console.log(this.$refs)
		},
		// 销毁前移除这个监听事件
		beforeDestroy() {
			console.log(123)
			window.removeEventListener('resize', this.water)
	
	}
}
</script>
<style type="text/css">
	.cart .van-nav-bar .van-icon {
		color: red;
	}
</style>
<style>
	.cart {
		overflow: auto;
	}

	.pbl {
		height: 100px;
		background-color: hotpink;
		margin-bottom: 20px;
	}

	.pblA {
		height: 120px;
	}

	.pblB {
		height: 240px;
	}

	.foot {
		display: flex;
		width: 100%;
		line-height: 1rem;
		height: 1rem;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #fff;
		;
	}

	.foot .col {
		flex: 1;
		text-align: center;
	}

	.foot .col.price {
		line-height: .4rem;
		text-align: center;
	}

	.sel,
	.del {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.items {
		width: 100%;
		display: flex;
	}

	.col-10 {
		width: 10%;
	}

	.col-30 {
		width: 30%;
	}

	.col-50 {
		width: 50%;
	}
</style>
