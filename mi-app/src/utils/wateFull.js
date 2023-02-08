function watefull(parent,son,col,gap){
			// 获取瀑布流的盒子div节点
				var con = document.querySelector(parent)
				var pbls = document.querySelectorAll(son)
				con.style.position = "relative"
				console.log(pbls.length)
				//定义列数
				var col = col;
				// 记录最小值
				var arr = [];  //arr=[0,0]
				arr.length=col; //数组的长度
				arr.fill(0) //默认0
				var gap = gap //间距
				// 获取每个元素的宽度
				//  (先获取父元素的宽度-间距*3 )/ 2
				var w = (con.offsetWidth - gap*(col+1)) / col
				for(var i = 0;i<pbls.length; i++){
					// 给每个div绝对定位pul
					pbls[i].style.position= "absolute"
					//找到数组中最小的值
					var min = Math.min(...arr)
					// 找最小值的下标
					var minIndex = arr.indexOf(min)
					// 设置div的宽度
					pbls[i].style.width = w + "px"
					// 开始定位 let         (0+1)*10+0/200px
					pbls[i].style.left = (minIndex+1) *gap + minIndex *w+"px"
					// 定位top值
					pbls[i].style.top = min + "px"
					// 更新最小值
					arr[minIndex] = min + pbls[i].offsetHeight + gap
				}
			}
			export {watefull}