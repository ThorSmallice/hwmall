<template>
    <div id="Home"> 
        <header>
            <header-bar></header-bar>
        </header>

        <main> 
            <div class="container">
                <!-- 轮播区 -->
                <div class="swiper-wrap">
                     <div class="swiper-box">
                        <swiper :options="swiperOptions">
                            <swiper-slide><a href="#"><img src="../assets/image/1.jpg" ></a></swiper-slide>
                            <swiper-slide><a href="#"><img src="../assets/image/2.jpg" ></a></swiper-slide>
                            <swiper-slide><a href="#"><img src="../assets/image/3.jpg" ></a></swiper-slide> 
                            <!-- 分页器 -->
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper> 
                    </div> 
                
                    <!-- 左右按钮 -->
                    <div class="btn-wrap">
                        <div class="swiper-button-prev btn-left"></div>
                        <div class="swiper-button-next btn-right"></div>
                    </div>
                </div>

                <!-- 左侧菜单栏 -->
                <div class="menu-wrap">
                    <silderMenu></silderMenu>
                </div>
            </div> 
        </main>

        <section>
            <div class="container">
                <!-- 新品推荐 -->
                <div class="new-pro-wrap">
                    <ul class="new-pro-list">
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                        <li><a href="#"></a></li>
                    </ul>
                </div>

                <!-- 爆款推荐 -->
                <div class="hot-style">
                    <h2>爆款推荐</h2>
                    <proBarOne></proBarOne>
                </div>

                <!-- 手机 -->
                <div class="tel-phone">
                    <h2>手机</h2>
                    <proBarTwo></proBarTwo>
                </div>
            </div>
        </section>
        
        <footer>
            <div class="container"> 
                <footerMenu></footerMenu>
            </div>
        </footer>
    </div>
</template>

<script>
import headerBar from "../components/HeaderBar.vue";    // 顶部导航栏 菜单 
import { Swiper, SwiperSlide  } from 'vue-awesome-swiper';  // swiper插件
import 'swiper/css/swiper.css'  // swiper插件样式
import silderMenu from "../components/SilderMenu.vue";  // 侧边菜单栏
import proBarOne from "../components/ProBarOne.vue";    // 商品列表组件1
import proBarTwo from "../components/ProBarTwo.vue";    // 商品列表组件2
import footerMenu from "../components/FooterMenu.vue";    // footer组件
export default {
    data() {
        return {
            // swiper轮播图配置
            swiperOptions: {
                // 分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true, // 分页器可点击 
                },
                // 左右按钮
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                // 切换效果
                effect: "cube",
                // 可循环
                loop:true,
                // 自动轮播
                autoplay:{
                    delay:4000, // 延迟时间
                    pauseOnMouseEnter: true, // 鼠标移入移出自动暂停开启
                    disableOnInteraction: false // 操作后依旧自动轮播
                }, 
                speed: 1000  // 切换速度
            }
        }
    },
    components: {
        headerBar,
        Swiper,
        SwiperSlide,
        silderMenu,
        proBarOne,
        proBarTwo,
        footerMenu
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
#Home{
    main {
        .container {
            position: relative;
            // 轮播图
            .swiper-wrap{
                 .swiper-box {
                    overflow: hidden;
                    position: relative;
                    left: 50%;
                    margin-left: -951.5px;
                    max-width: 1903px;
                    height: 550px;  
                }
                .swiper-container{ 
                    --swiper-pagination-color: #fff; 
                }
                .btn-wrap {
                    position: absolute;
                    width: 900px;
                    height: 80px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    z-index: 20;
                    top: 50%;
                    // transform: translateY(-50%);
                    right:65px;  
                    .btn-left,.btn-right{
                        position: static;
                        top: 0;
                        left: 0;
                        right: 0;
                        width: 55px;
                        height: 55px; 
                        border-radius: 50%;
                        background: rgba(0, 0, 0, 0.2);
                        &::after{
                            color: #fff;
                            font-size: 15px;
                        }
                    }
                }
            }

            // 左侧菜单栏
            .menu-wrap{
                position: absolute;
                z-index: 20;
                left: 0;
                top: 27px; 
            }
           
        }
    }

    section{
        width: 100%;
        background-color: $color5;
        padding: 20px;
        // 新品推荐
        .new-pro-wrap {
            .new-pro-list {
                width: 100%;
                display: flex;
                justify-content: space-between;
                >li{
                    width: 291px;
                    height: 194px;
                    background-color: #87ceeb;
                    >a{
                        display: block; 
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        // 爆款推荐
        .hot-style{
            width: 100%;
        }
    }
}
</style>