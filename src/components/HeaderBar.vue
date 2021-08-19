<!-- 头部导航栏  -->
<template>
    <div id="headerBar">
        <!-- 导航栏上部  -->
        <div class="header-top">
            <div class="container clearfix">
                <!-- 左边列表 -->
                <ul class="link-list-left">
                    <li><router-link to="/index">首页</router-link></li>
                    <li><a href="#">花粉俱乐部</a></li>
                    <li><a href="#">米粉俱乐部</a></li>
                    <li>
                       <a href="javascript:;">
                           更多精彩 
                           <span class="b_icon icon_jiantou"></span>
                       </a> 

                        <ul class="ul-link-more">
                            <li><a href="#">HarmonyOS</a></li>
                            <li><a href="#">应用市场</a></li>
                            <li><a href="#">开发者联盟</a></li>
                        </ul>
                    </li>  
                </ul>

                <!--   右边购物车列表 -->
                <ul class="link-list-right">
                     <li v-if="userInfo"  class="log-out">
                         <a href="javascript:;">{{userInfo.username}}</a>
                          <div @click="toLogOut">
                             退出登录
                         </div>
                    </li>

                     <li v-else>
                         <router-link to="/log/login" >请登录</router-link> 
                     </li> 
                     <li><router-link to="/log/register">注册</router-link></li>
                     <li><router-link to="/order">我的订单</router-link></li>
                     <li>
                        <router-link to="/car">
                            <i class="b_icon iconfont icon-gouwuche"></i>
                            购物车
                            ({{userInfo.buyCar.length}})
                        </router-link>

                         <ul class="ul-link-more">
                                <div class="buycarno"  v-if="userInfo.buyCar.length == 0">
                                    <li> 
                                        <i  class="b-icon iconfont icon-gouwuche"></i>
                                        <p>您的购物车是空的，赶紧选购吧~</p>
                                    </li> 
                                </div>

                                <div class="buycarhas">
                                    <template v-for="item in userInfo.buyCar">
                                        <li class="car-item" :key="item.id"> 
                                            <img :src="item.s_good.s_goods_photos[0].path">
                                            <p>{{item.s_good.name}}</p>
                                            <span>单价￥{{item.s_good.sale_price}}</span>
                                            <span>数量{{item.num}}</span>
                                            <span>金额￥{{item.num * item.s_good.sale_price}}</span>
                                        </li>    
                                    </template>
                                </div>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>

        <!-- 商品分类导航 -->
        <div class="header-bot">
            <div class="container">
                <div class="header-nav-wrap">
                    <!-- 商城LOGO -->
                    <div class="logo">
                         <img src="../assets/image/public/logo.jpg"  @click="toLink">
                    </div>

                    <!-- 导航栏 -->
                    <ul class="nav">
                        <li><a href="#">华为专区</a></li>
                        <li><a href="#">小米专区</a></li>
                        <li><a href="#">智能家居</a></li>
                        <li><a href="#">运动健康</a></li>
                    </ul>

                    <!-- 搜索框 -->
                    <div class="search">
                         <a-input-search placeholder="小米MIX4"/> 
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    methods: {
        // 登录
        toLink() { 
            if ( this.$route.path !== '/index') {
                this.$router.push('/index')
            }
        },
        // 注销
        toLogOut() {
            this.axios.post('/api/logout').then(res => {
                // 更新vuex userInfo为null
                this.$store.commit('updateUserInfo', null);
                // 清除Storage里的userInfo
                window.sessionStorage.removeItem('userInfo');
                // 提示退出成功
                this.$message.success(res.msg);
                // 刷新页面
                location.reload(); 
            }) 
        }
    
    },
    computed: {
        ...mapState(['userInfo'])
    }
}
</script>

<style lang="scss" scoped> 
@import './../assets/scss/color.scss';
#headerBar{
    // overflow: visible;
    width: 100%;
    // 导航栏上部
    .header-top{ 
        background-color: rgb(0, 0, 0);
        .link-list-left,  .link-list-right{ 
            float: left;
            >li {  
                position: relative;
                height: 36px; 
                line-height: 36px;
                float: left;
                padding: 0 8px; 
                &::after {
                    content: "";
                    position: absolute;
                    display: block;
                    top: 15px;
                    right: 0;
                    width: 1px;
                    height: 10px; 
                    background: #414141;
                }
                a {
                    color: rgba(255,255,255,0.6); 
                    &:hover{
                        color: #fff;
                    }
                }
                &:first-child{
                    padding-left: 0;
                } 
                &:last-child{
                    &::after{
                        content: "";
                        width: 0;
                        height: 0;
                    }
                    &:hover{
                        background-color: #fff;
                        >a{
                            color: rgb(207, 10, 44); 
                        }
                        >.ul-link-more{
                            display: block;
                        }
                        .icon_jiantou { 
                            background: url("../assets/image/public/jiantoutop.png") no-repeat; 
                            background-size: 12px 12px;
                        }
                    }
                }
            }
        }
        .link-list-right {
            float: right; 
            >li {
                &:last-of-type{
                    background: rgb(66, 66, 66) ;
                    &:hover{
                        background-color: #fff;
                        
                        >a{
                            color: rgb(207, 10, 44);  
                        }

                    }
                }
                &:nth-child(n+3) {
                     &::after{
                        content: "";
                        width: 0;
                        height: 0;
                    }
                }
                .ul-link-more {
                    padding: 50px 0;
                    width: 470px;
                    box-shadow: rgb(0 0 0 / 10%) 0px 5px 10px;
                    .buycarno {
                        display: flex;
                        width: 460px;
                        height: 231px;
                        text-align: center;
                        flex-direction: column;
                        justify-content: center; 
                        .b-icon {
                            display: block;
                            font-size: 80px;
                            color: $color2;
                            margin-bottom: 20px;
                        }
                        >p {
                            font-size: 15px;
                            color: $color2;
                        }
                    }
                    .buycarhas{
                        width: 470px; 
                        padding: 0 10px;
                        height: 200px;
                        overflow-y: auto;
                        overflow-x: hidden;
                        .car-item { 
                            display: flex;
                            width: 450px;
                            height: 60px;
                            line-height: 60px;
                            justify-content: space-evenly;
                            margin-bottom: 20px;
                            padding-bottom: 10px;
                            border-bottom: 1px dashed #ccc;
                            >p {
                                width: 115px;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                            img { 
                                width: 50px;
                                height: 50px;
                            }
                        }
                    }
                }
            }
            >.log-out {
                position: relative;
                >div {
                    user-select: none;
                    cursor: pointer;
                    position: absolute; 
                    z-index: 21;
                    top: 36px;
                    right: 0;
                    display: none; 
                    color: rgba(255,255,255,0.6);
                    // padding: 8px;
                    text-align: center;
                    font-size: 12px;
                    width: 55px;
                    height: 100%; 
                    box-shadow: rgb(0 0 0 / 10%) 0px 5px 10px;
                    background-color: #000;
                    &:hover{
                        color: #fff;
                    }

                }
                &:hover{
                    // background-color: #fff;
                    >div {
                        display: block; 
                    }
                }
            }
        }
        .ul-link-more{
            display: none;
            position: absolute;
            top: 36px;
            right: 0;
            background-color: #fff;
            z-index: 20;
            li {
                padding: 0 8px;
                a {
                    color: #777; 
                    &:hover{
                        color: rgb(207, 10, 44); 
                    }
                } 
            }
        }
        .icon_jiantou {
            display: inline-block;
            vertical-align: middle;
            background: url("../assets/image/public/jiantoubot.png") no-repeat; 
            background-size: 12px 12px;
        }
    } 

    // 商品分类导航 
    .header-bot { 
        .header-nav-wrap {
            display: flex;
            height: 74px;
            justify-content: space-between;
            align-items: center;
            // logo
            .logo {
                cursor: pointer;
                width: 170px; 
                img{
                    width: 100%;  
                }
            }
            // 导航栏
            .nav {
                width: 800px;
                display: flex;
                justify-content: flex-start;
                >li {
                  
                    padding: 0 20px;
                    >a {
                        font-size: 16px; 
                        &:hover{
                            color: $color3;
                        }
                    }
                }
            }
            // 搜索框
            .search {
                width: 200px; 
            }
        }
       
    }
    
}
</style>