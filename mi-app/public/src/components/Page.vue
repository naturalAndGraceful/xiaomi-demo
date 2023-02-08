<template>
	<div>
		<div class="sections"
			v-for="item in sections"
			:key="item.block_id"
			>
			<div v-if="item.view_type=='gallery'">
				<img 
				:src="item.body.items[0].img_url" 
				:style="{
				'width':item.body.items[0].w/100+'rem',
				'height':item.body.items[0].h/100+'rem'}">
			</div>
			<!-- cella_auto_fill自适应模块 -->
			<div 
			v-if="item.view_type=='cells_auto_fill'"
			:style="{
				'height':item.body.h/100+'rem',
				'width':item.body.w/100+'rem',
				'position':'relative'
			}"
			>
				<img 
				v-for="pic in item.body.items"
				:src="pic.img_url"
				 :style="{
					 'height':pic.h/100+'rem',
					 'width':pic.w/100+'rem',
					 'position':'absolute',
					 'top':pic.y/100+'rem',
					 'left':pic.x/100+'rem'
				 }">
			</div>
			<!-- divider_line 分割线 -->
			<div 
			v-if="item.view_type=='divider_line'"
			:style="{
				'width':'100%',
				'height':item.body.line_height/100+'rem',
				'backgroundColor':item.body.line_color
			}">
				
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				sections:[]
			}
		},
		props:{
			item:{
				type:Object,
				default:function(){
					return {}
				}
			}
		},
		created(){
			this.getSections()
		},
		methods:{
			getSections(){
				this.$http.post(
				// axios 的参数url body config
					"/v1/home/page",
					`client_id=180100031051&channel_id=19460.8888&webp=1&page_type=${this.item.page_type}&page_id=${this.page_type}`,
					{
						headers:{
							'content-type': 'application/x-www-form-urlencoded'
						}
					}
				).then(res=>{
					console.log(res)
					this.sections=res.data.data.data.sections;
					
				}).catch(err=>{
					console.error(err)
				})
			}
		}
	}
</script>

<style>
</style>
