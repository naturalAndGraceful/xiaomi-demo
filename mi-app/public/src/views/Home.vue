<template>
	<!-- vue 的开发主要是和后台对接数据 -->
  <div class="home">
	  <div class="header">
		  <div class="logo"><img src="../assets/logo.png" width="24"></div>
		  <input type="text" placeholder="搜索关键字" class="header_ipt">
		  <div class="btn"><img src="../assets/user.png" width="24"></div>
	  </div>
	  <div class="subheader">
		  <div class="up">
			  <div class="wrap">
				  <div class="item" 
				  :class="{'active':tabCurrent==index}"
				  v-for="(item,index) in tabs"
				   @click="tabCurrent=index"
				  :key="item.page_id">{{item.name}}</div>
				  
			  </div>
			  <div class="arrow" @click="showDown=!showDown" :class="{'isDown':showDown}">
				  <img src="../assets/arrow.png" width="24">
			  </div>
		  </div>
		  <div class="down" v-show="showDown">
			  <div class="title">全部</div>
			  <div class="btns">
				  <div class="btn_item"
				  v-for="(item,index) in tabs"
				  :class="{'active':tabCurrent==index}"
				   @click="tabCurrent=index,showDown=!showDown"
				  :key="item.page_id">{{item.name}}</div>
			  </div>
		  </div>
	  </div>
	  <div class="pages">
		  <div>
			  {{address.city}}
			  <img :src="'https://mat1.gtimg.com/pingjs/ext2020/qqindex2018/dist/img/weather/53.svg'" alt="" width="24">
			  {{weather.degree}}℃
		  </div>
			<Page
			 v-for="(item,index) in tabs"
			 :key="item.page_id"
			 v-show="tabCurrent==index"
			 :item="item"></Page>
	  </div>
  </div>
</template>

<script>
	// 引入组件
import Page from "@/components/Page.vue"
import request from "../utils/request.js"
import { GetCategory2} from "@/api/category/category.js"
export default {
  data(){
	  return{
	  showDown:false,
	  tabs:[],
	  tabCurrent:0,
	  address:{},
	  weather:{}
	  }
  },
  created() {
  	this.getHomeTabs(data1);
	this.getCity();
 var data1={client_id:180100031051,channel_id:19460.8888,webp:1,page_type:'activity',page_id:10288}
  },
  // 注册组件
  components:{
	  Page
  },
  methods:{
	  // getHomeTabs(){
		 //  // 使用axios 发送post
		 //  // axios 本身支持promise
		 //  //     .then  .catch
		 //  // axios.post(url,body,config/header)
		 //  this.$http.post(
			// "/v1/home/page",//请求接口 path
			
			// "client_id=180100031051&channel_id=19460.8888&webp=1&page_type=activity&page_id=10288"//请求参数
			
		 //  ).then(res=>{
			//   console.log(res.data);
			//   // 赋值 拿数据
			//   this.tabs=res.data.data.tabs
		 //  }).catch(err=>{
			// 		console.error(err)
			// 	})}
			getHomeTabs(data1){
				GetCategory2(data1).then(res=>{
				console.log(res)
				this.tabs=res.data.data.tabs
			}).catch(err=>{
				console.error(err)
			}) 
			}	
	 ,
	  getCity(){
		  request.jsonp(
		  "https://r.inews.qq.com/api/ip2city?otype=jsonp&callback=callback&callback=jQuery111102817891066414837_1642495947592&_=1642495947593"
		  ).then(res=>{
			  console.log(res)
			  this.address=res
			  
			  // jsonp 可以屏蔽某些同源策略
			  request.jsonp(
			  `https://wis.qq.com/weather/common?weather_type=observe|forecast_24h|air&source=pc&province=${this.address.province}&city=${this.address.city}&callback=__jp1`
			  ).then(res=>{
				  console.log(res)
				  this.weather=res.data.observe
			  })
		  })
	  }
  }
}
</script>
<style scoped="scoped">
	.subheader,.header{
		background-color: #F0F0F0;
		height: .88rem;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}
	.subheader{
		top: 0.88rem;
	}
	.header{
		height: 0.88rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.logo,.btn{
		line-height: 0.88rem;
		padding: 0 0.2rem;
	}
	.header_ipt{
		line-height: 0.58rem;
		padding: 0 0.1rem;
		flex: 1;
	}
	.subheader .up{
		height: .88rem;
		display: flex;
	}
	.subheader .wrap{
		display: flex;
		justify-content: center;
		align-items: center;
		hieght:.88rem;
		flex: 1;
	}
	.wrap .item.active{
		color: #f70;
		border-bottom: 2px solid #f70;
	}
	.arrow img{
			transition: all 1s;
	}
	.wrap .item{
		margin: 0 .3rem;
		color: #484848;
		font-size: .24rem;
		 line-height: .88rem; 
		 border-bottom: 2px solid transparent;
		 
	}
	.isDown img{
		transform: rotate(180deg);
	}
	.arrow{
		width: 0.88rem;
		line-height: 0.88rem;
	}
	/* .arrow img{
		transform: rotate(180deg);
	} */
	.down{
		width: 100%;
		position: absolute;
		top: 0.88rem;
		background-color: #f0f0f0;
		z-index: 1;
		
	}
	.down .btns{
		display: flex;
		flex-wrap:wrap;
		
	}
	.down .btn_item{
		box-sizing: border-box;
		width: 1.6rem;
		border-radius: 0.04rem;
		border: thin solid #ccc;
		background-color: #fff;
		line-height: .5rem;
		text-align: center;
		margin-left: .15rem;
		margin-bottom: 0.15rem;
		font-size: .25rem;
	}
	.btn_item.active{
		border: 1px solid #f70;
		background-color: #fde0d5;
		color: #f70;
	}
	.down .title{
		background-color: #f0f0f0;
		line-height: .88rem;
		padding-left: 0.2rem;
		font-size: 0.24rem;
		color: #333333;
		margin-top: -0.88rem; 
		width: 80%;
	}
	.pages{
		bottom: 0.59rem;
		width: 100%;
		position: absolute;
		top: 1.76rem;
		overflow-y: auto;
	}
</style>