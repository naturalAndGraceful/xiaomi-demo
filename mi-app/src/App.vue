<template>
  <div id="app">
	  <!-- router-view 代表对应要显示的组件内容 -->
	  <!-- keep-alive组件缓存的组件标签 -->
	  <keep-alive v-if="$route.meta.keep">
		  <router-view class="page" :class="{'has-tabs':$route.meta.keep}"/>
	  </keep-alive>
	  <router-view v-else class="page " :class="{'has-tabs':$route.meta.keep}"/>
	  <!-- 底部导航 -->
    <div id="nav" v-if="!$route.meta.nofoot">
      <router-link to="/" class="nav-list ihome">首页</router-link> 
      <router-link to="/cate" class="nav-list icate">分类</router-link>
      <router-link to="/ball" class="nav-list iball">米圈</router-link>
      <router-link to="/cart" class="nav-list icart">购物车
	  <van-badge :content="$store.state.goods.length" class="cart-badge" />
	  </router-link>
      <router-link to="/user" class="nav-list iuser">我的</router-link>
    </div>
    
  </div>
</template>
<script type="text/javascript">
	//import bus from './utils/bus.js'
	export default{
		data(){
			return{
				// showTabs:true 
			}
		},
		created(){
			// 监听事件
			//bus.$on('tabchange',$event=>this.showTabs=$event) 
			// 进入组件就该获取到购物车的数据
			// 通过$store.dispatch去调用actions下面的getCart方法
			this.$store.dispatch("getCart")
		}
	}
</script>
<style scoped="scoped">
	.icart{
		position: relative;
	}
	.icart .cart-badge{
		position: absolute;
		right: .15rem;
		top: 0;
	}
	.page{
		position: absolute;
		left: 0;
		top: 0;
		bottom: 1rem;
		right: 0;
		margin: auto;
	}
	.has-tabs{
		bottom: 1rem;
	}
	#app{
		height: 100vh;
		width: 100%;
		position:relative;
	}
	#nav{
		width: 100%;
		background-color: #f0f0f0;
		display: flex;
		position: fixed;
		left: 0px;
		bottom: 0px;
		font-size: 0.18rem;
		color: #333;
		text-align: center;
	}
	.nav-list{
		height: 1rem;
		width: 20%;
		color: #666;
	}
	.nav-list.router-link-exact-active{
		color: #f70;
	}
	.nav-list:before{
		content: "";
		display: block;
		width: .45rem;
		height: .45rem;
		background-size: 100%;
		background-repeat:no-repeat ;
		margin: 0.1rem auto;
	}
	.nav-list.ihome:before{background-image: url(assets/home.png);}
	.nav-list.icate:before{background-image: url(assets/cat.png);}
	.nav-list.iball:before{background-image: url(assets/ball.png);}
	.nav-list.icart:before{background-image: url(assets/cart.png);}
	.nav-list.iuser:before{background-image: url(assets/user.png);}
	
	/*router-link-exact-active 是router-link自动生成的 选中状态类名  */
	.nav-list.ihome.router-link-exact-active:before{background-image: url(assets/home-h.png);}
	.nav-list.icate.router-link-exact-active:before{background-image: url(assets/cat-h.png);}
	.nav-list.iball.router-link-exact-active:before{background-image: url(assets/ball-h.png);}
	.nav-list.icart.router-link-exact-active:before{background-image: url(assets/cart-h.png);}
	.nav-list.iuser.router-link-exact-active:before{background-image: url(assets/user-h.png);}
</style>
