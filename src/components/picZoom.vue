<template>
    <div id="picZoom" class="web" ref="webBox"> 
        <div class="swper-box">
                <swiper :options="swiperOptions"> 
                    <template v-for="item in carouselArr">
                        <swiper-slide :key="item.id"> 
                            <img :src="item.path"/> 
                        </swiper-slide>
                    </template>

                    <!-- 分页器 -->
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
                <!-- 左右按钮 -->
                <div class="btn-wrap">
                    <div class="swiper-button-prev btn-left"></div>
                    <div class="swiper-button-next btn-right"></div>
                </div>
        </div> 
    </div>
</template>

<script> 
import { Swiper, SwiperSlide } from "vue-awesome-swiper"; // swiper插件
import "swiper/css/swiper.css"; // swiper插件样式
export default {
    props: {
        carouselArr: Array,
    },
    data() {
        return {
            // swiper轮播图配置
            swiperOptions: {
                // 分页器
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true, // 分页器可点击
                },
                // 左右按钮
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                // 子项目类名
                slideClass :"swiper-item",
                  
                speed: 500, // 切换速度
            },
          
        }
    },
    methods: {
        getImgUrl(i) { 
            return this.carouselArr[i].path
        }
        // // 右箭头点击
        // rightClick() {
		// 	if (this.canClick) {
		// 		this.canClick = false;
		// 		this.nowIndex++; 
		// 		this.Run();
		// 	}
		// },
        // // 左箭头点击
		// leftClick() {
		// 	if (this.canClick) {
		// 		this.canClick = false;
		// 		this.nowIndex--;
		// 		this.Run()
		// 	}
		// },
        // // 小圆点点击
        // pointClick (index) {
        //     if (this.canClick) {
        //         this.canClick = false;
        //         this.nowIndex = index;
        //         this.Run()
        //     }
        // },
        // // 轮播图切换
		// Run() {
		// 	this.ulStyle.transform = `translateX(-${this.nowIndex}00%)`
        //     // this.canClick = true
		// },
        // // 自动轮播
		// autoRun () {
		// 	this.autoRunTimer = setInterval(() => { 
		// 		// if (this.canClick) {
		// 		// 	this.canClick = false;
		// 		// 	this.nowIndex++; 
		// 		// 	this.Run(); 
		// 		// }
        //         this.rightClick()
		// 	}, 3500)
		// },
		// // 取消自动轮播
		// clearAutoRun () {
		// 	clearInterval(this.autoRunTimer)
		// },
        // // 偷龙转凤
		// togglePic () {
        //     //  if (this.nowIndex  == this.carouselArr.length - 1 || this.nowIndex == 0) {
		// 	// 	this.ulStyle.transition = "none";
        //     //     // !this.nowIndex? this.nowIndex = this.carouselArr.length - 2: this.nowIndex = 1;
        //     //     this.ulStyle.transform = `translateX(-${this.nowIndex}00%)`;
        //     //     this.$nextTick( function () {
        //     //         getComputedStyle(e.target).transition
        //     //         this.ulStyle.transition = "";
        //     //     })
		// 	// }
        //     // if(this.nowIndex == this.carouselArr.length - 1) { 
        //     //     this.$refs.rightArrow.style.cursor = "not-allowed"
        //     // } else if (this.nowIndex == 0) {
        //     //     this.$refs.leftClick.style.cursor = "not-allowed"
        //     // }else {
        //     //     this.$refs.rightArrow.style.cursor = "pointer"
        //     //     this.$refs.leftClick.style.cursor = "pointer"
        //     // }
        //     this.canClick = true;
        // }

    },
    computed:{  
      
	},
    components: {
        // 'a-carousel':Carousel
        Swiper,
        SwiperSlide,
    }
  

}
</script>

<style lang="scss" scoped> 
@import "../assets/scss/color.scss";
#picZoom{
    width: 100%;
    .swper-box {
        position: relative;
        width: 100%; 
        .swiper-pagination {
            bottom: -3px;
        }
        .swiper-item  {
            width: 450px;
            img {
                width: 450px;
            }
        }
        .btn-wrap {
            position: absolute;
            top: 50%;
            width: 100%;
            height: 30px;
            div[class*="swiper-button"] {
                border-radius: 50%;
                width: 30px;
                height: 30px; 
                line-height: 30px;
                color: #fff;
                background-color: rgba(0, 0, 0, 0.2);
                --swiper-navigation-size: 15px;/* 设置按钮大小 */
            }
        }
    }
}

</style>