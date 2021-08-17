<template>
    <div id="picZoom" class="web" ref="webBox"> 
        <div class="carouselBox">
            <ul :style="ulStyle" ref="ul" @transitionend="togglePic">
                <template v-for="(item, index) in carouselArr">
                    <li :key="index">
                        <img :src="item.path">
                    </li>
                </template>
            </ul>

            <section class="arrow leftArrow" @click="leftClick">&lt;</section>
            <section class="arrow rightArrow" @click="rightClick">&gt;</section>

            <section class="pointBox">
                <ol>
                    <template v-for="(item, i) in carouselArr">
                        <li :key="i" :class="{active: nowIndex == i }" @click="pointClick(i)">
                            <img :src="item.path" alt="">
                        </li>
                    </template>
                </ol>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        carouselArr: Array,
    },
    data() {
        return {
            nowIndex: 0,    // 当前激活的下标
            canClick: true,     // 允许点击
            autoRunTimer: null, // 自动轮播，
            ulStyle: { 
                transition: "",     // 动画属性
                transform: "translateX(-00%)"  // 开始位置
            },
            // carouselArr: ["img/1.png","img/2.png","img/3.png"], // 图片列表
        }
    },
    methods: {
        // 右箭头点击
        rightClick() {
			if (this.canClick) {
				this.canClick = false;
				this.nowIndex++; 
				this.Run();
			}
		},
        // 左箭头点击
		leftClick() {
			if (this.canClick) {
				this.canClick = false;
				this.nowIndex--;
				this.Run()
			}
		},
        // 小圆点点击
        pointClick (index) {
            if (this.canClick) {
                this.canClick = false;
                this.nowIndex = index;
                this.Run()
            }
        },
        // 轮播图切换
		Run() {
			this.ulStyle.transform = `translateX(-${this.nowIndex}00%)`
            // this.canClick = true
		},
        // 自动轮播
		autoRun () {
			this.autoRunTimer = setInterval(() => { 
				// if (this.canClick) {
				// 	this.canClick = false;
				// 	this.nowIndex++; 
				// 	this.Run(); 
				// }
                this.rightClick()
			}, 3500)
		},
		// 取消自动轮播
		clearAutoRun () {
			clearInterval(this.autoRunTimer)
		},
        // 偷龙转凤
		togglePic () {
            //  if (this.nowIndex  == this.carouselArr.length - 1 || this.nowIndex == 0) {
				// this.ulStyle.transition = "none";
                // // !this.nowIndex? this.nowIndex = this.carouselArr.length - 2: this.nowIndex = 1;
                // this.ulStyle.transform = `translateX(-${this.nowIndex}00%)`;
                // this.$nextTick( function () {
                //     getComputedStyle(e.target).transition
                //     this.ulStyle.transition = "";
                // })
			// }
            this.canClick = true;
        }

    },
    computed:{  
        // 复制头部和尾部的图片 无限轮播时开启
		// resCarouselArr () {
		// 	this.carouselArr.push(String(this.carouselArr.slice(0,1)));
		// 	this.carouselArr.unshift(String(this.carouselArr.slice(-2,-1)))
		// 	return this.carouselArr;
		// }
	}
  

}
</script>

<style lang="scss" scoped> 
@import "../assets/scss/color.scss";
.web .carouselBox { 
  width: 450px;
  height: 550px;
  border: 1px solid #ccc;
  position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
  overflow: hidden; }
  .web .carouselBox ul {
    width: 100%;
    white-space: nowrap;
    font-size: 0;
    margin-bottom: 20px;
    transition: all .5s;}
    .web .carouselBox ul li {
      display: inline-block;
      width: 100%; }
      .web .carouselBox ul li img {
        width: 100%; }
  .web .carouselBox .arrow {
    opacity: 0;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    position: absolute;
    user-select: none;
    top: 50%;
    border-radius: 50%;
    background-color: $color2;
    transform: translateY(-50%);
    color: #fff;
    transition: all .3s;
    cursor: pointer; }
  .web .carouselBox .leftArrow {
	
    left: 10px;
     
      }
    .web .carouselBox .rightArrow {
        
    right: 10px;
     
      }
  .web .carouselBox:hover .arrow {
      opacity: 1;
    }
  .web .carouselBox .pointBox { 
    transition: all .3s; }
    .web .carouselBox .pointBox ol {
      display: inline-block;
      white-space: nowrap;
      background-color: #87ceeb;
    //   border-radius: 50% 0%;
      padding: 0;
    }
      .web .carouselBox .pointBox ol li {
        width: 60px;
        height: 60px;
        display: inline-block;
        background-color: #fff;
        margin: 0 8px;
        cursor: pointer;
        // border-radius: 50%;
        img {
            width: 100%;
        }
    }
      .web .carouselBox .pointBox ol .active {
        border: 1px solid red;
        }
//   .web .carouselBox:hover .pointBox {
//     //   bottom: 30px;     

//     }

/*# sourceMappingURL=index.css.map */

</style>