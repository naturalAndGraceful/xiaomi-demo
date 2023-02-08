<template>
	<div>
		<div class="sections" v-for="item in sections" :key="item.block_id">

			<div v-if="item.view_type=='gallery'">
				<img :src="item.body.items[0].img_url" :style="{
					'width':item.body.items[0].w/100+'rem',
					'height':item.body.items[0].h/100+'rem'
				}">
			</div>

			<!-- cells_auto_fill自适应模块 -->
			<div v-if="item.view_type=='cells_auto_fill'" :style="{
				 'height':item.body.h/100+'rem',
				 'width':item.body.w/100+'rem',
				  'position':'relative'
			 }">
				<img v-for="pic in item.body.items" :src="pic.img_url" :style="{
			 'width':pic.w/100+'rem',
			 'height':pic.h/100+'rem',
			'position':'absolute',
			'top':pic.y/100+'rem',
			'left':pic.x/100+'rem'
			 }">
			</div>

			<!-- divider_line分割线 -->
			<div v-if="item.view_type=='divider_line'" :style="{
				'width':'100%',
				
			}">
			</div>

			<div v-if="item.view_type=='list_two_type13'" :style="{
				'width':item.body.width>0?item.body.width:false,
				'height':item.body.width>0?item.body.height:false,
				'display':'flex',
				'justify-content':'space-between',
				'padding':'0 .1rem'
			}">
				<div :style="{'width':'49%'}" v-for="listItem in item.body.items" :key="listItem.product_id">
					<img :src="listItem.img_url" :style="{
						'width':'100%'
					 }">
					<p :style="{
						 'textAlign':'center',
						 'fontSize': '.26rem',
						'color':'rgba(0,0,0,.87)',
						'padding':'.05rem 0 '
					 }">
						{{listItem.product_name}}
					</p>
					<p :style="{
					 						 'textAlign':'center',
					 						 'fontSize': '.22rem',
					 						'color':'rgb(120,120,120)'
					 }">
						{{listItem.product_brief}}
					</p>
					<p
					:style="{
						 'textAlign':'center',
						 'padding':'.1rem 0'
					}"
					>
						<span
						:style="{
							'fontSize':'.22rem',
							'color':'red'
						}"
						>￥{{listItem.product_price}}起</span>
						<span
						:style="{
							'fontSize':'.19rem',
							'text-decoration':'line-through',
							'color':'#555'
						}"
						>￥{{listItem.product_org_price}}</span>
					</p>
					<div
					class='pay'
					>立即购买</div>
				</div>
			</div>

			<div v-if="item.view_type=='list_one_type14'">
				<div v-for="item in item.body.items">
					<img :src="item.img_url" :style="{
						'width':'100%',
						
					 }">
					 <div :style="{
					'display':'flex',
					'justify-content':'space-between',
					'height':'.8rem',
					padding:'0 .1rem'
					}">
				<div>
					<div
					:style="{
						fontSize:'.22rem',
						'margin':'.1rem 0'
					}"
					>{{item.product_name}}</div>
					<div>{{item.product_brief}}</div>
				</div>
				<div>
					<p
					:style="{'textAlign':'right',
						fontSize:'.2rem',
						margin:'.06rem 0'
					}"
					>￥{{item.show_price}}</p>
					<div
					:style="{
						'color':'#fff',
						'padding':'.05rem .1rem',
						'backgroundColor':'#d00',
						'borderRadius':'.05rem',
						fontSize:'.2rem'
					}"
					>立即购买</div>
				</div>
					</div>
				</div>
			</div>
			<div v-if="item.view_type=='list_action_title'">
				<div v-for="item in item.body.items">
					{{item.action_title}}
				</div>
			</div>

			<div v-if="item.view_type=='list_three_type4'"
			:style="{
				'display':'flex',
				'justifyContent': 'space-around'
			}"
			>
				<div v-for="item in item.body.items"
				:style="{
					'textAlign':'center',
					'width':'30%',
				}"
				>
					<img :src="item.img_url" :style="{
						 'width':'100%',
						 'height':'100'
					 }">
					<p class="ellipsis">{{item.product_name}}</p>
					<p class="ellipsis">{{item.product_brief}}</p>
					<p class="ellipsis">
						<span>￥{{item.product_price}}&ensp;</span>
						<span 
						:style="{
							'text-decoration':'line-through',
						}"
						>￥{{item.product_org_price}}</span>
					</p>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sections: []
			}
		},
		props: {
			"item": {
				type: Object,
				// 默认值 {}空对象
				default: function() {
					return {}
				}
			}
		},
		// 发送请求
		created() {
			this.getSections()
		},
		methods: {
			getSections() {
				// axios.post(url body,config/header) 
				// 请求页面内容
				this.$http.post(
					"/v1/home/page",
					`client_id=180100031051&channel_id=&webp=1&page_type=${this.item.page_type}&page_id=${this.item.page_id}`, {
						headers: {
							"content-type": "application/x-www-form-urlencoded"
						}
					}
				).then(res => {

					console.log(res.data.data.data.sections)
					// 返回数据
					this.sections = res.data.data.data.sections
				}).catch(err => {
					// 处理错误信息
					console.error(err)
				})
			}
		}
	}
</script>

<style>
.pay{
	width: 2rem;
	    background: #ea625b;
	    border-radius: 0.05rem;
	    text-align: center;
	    color: #fff;
	    font-size: .24rem;
	    padding: 0.16rem 0;
	    font-weight: 700;
		margin: 0 auto;

}
.ellipsis{
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
