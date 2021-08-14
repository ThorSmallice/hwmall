<template>
    <div id="silderMenu">
        <ul class="ul-silder">
            <template v-for="item in proList.proClass">
                 <li :key="item.key">
                    <a href="#">
                        {{item.name}}
                    </a>
                    <i class="b-icon iconfont icon-youjiantou"></i>
                    <div class="silder-prolist-wrap">
                        <ul class="silder-item-prolist clearfix">
                            <template v-for="config in item.s_goods">
                                  <li class="pro-item"  :key="config.key">
                                    <div class="pro-img"> 
                                         <img :src="config.s_goods_photos[0].path">
                                    </div>
                                    <div class="pro-text"> 
                                         <p>{{config.name}}</p>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                </li>
            </template>
            <!-- <li>
                <a href="#">手机</a>
                <div class="silder-prolist-wrap">
                    <ul class="silder-item-prolist clearfix">
                        <li class="pro-item">1</li>
                        <li class="pro-item">2</li> 
                    </ul>
                </div>
            </li>
            <li><a href="#">智能穿戴</a></li>
            <li><a href="#">耳机音箱</a></li>
            <li><a href="#">智慧屏</a></li>
            <li><a href="#">电脑</a></li>
            <li><a href="#">平板</a></li>
            <li><a href="#">智能路由</a></li>
            <li><a href="#">配件</a></li>
            <li><a href="#">生态产品</a></li>
            <li><a href="#">家用电器</a></li>
            <li><a href="#">美食酒饮</a></li>
            <li><a href="#">增值服务/企业商用</a></li> -->
        </ul>
    </div>
</template>

<script>
export default {
    props:{
        "pro-list" : Object, // 所有分类列表 和 每个分类下的产品列表 
    },
    data() {
        return {
            // 列表要渲染的数据 给默认值
            // defaultList:["手机","智能穿戴","耳机音箱","智慧屏","电脑","平板","智能路由","配件","生态产品","家用电器","美食酒饮","增值服务/企业商用"],
            
        }
    },
    methods :{
        getDefaultList() {
            
        }
    },
    created() {
    
    },
    computed:{
        // dataList() {
        //     return this.proList;
        // }
    }
}
</script>

<style lang="scss" scoped>
@import './../assets/scss/color.scss'; 
#silderMenu{
    width: 200px;
    height: 496px;
    padding: 8px 0;
    background-color: #fff;
    // border-radius: 5px;
    box-shadow: rgb(0 0 0 / 10%) 0px 5px 10px;

    .ul-silder {
        position: relative;
        >li {
            display: flex;
            justify-content: space-between;
            padding: 0 10px 0 24px;
            cursor: pointer;
            line-height: 40px; 
            >.b-icon {
                font-size: 14px;
            }
            >a{
                color: $color4;
                font-size: 14px;
            }
            &:hover{
                 background-color: rgb(238, 235, 235); 
                >a{
                    color: $color3; 
                }
                >.silder-prolist-wrap{
                    display: block;
                }
            }
            .silder-prolist-wrap{
                display: none;
                position: absolute;
                min-width: 225px;
                top: -8px;
                left: 200px; 
                background-color:#fff;  
                .silder-item-prolist {   
                    padding: 8px 8px 0 8px;
                    writing-mode: vertical-lr; 
                    height: 496px;  
                    .pro-item{  
                        display: inline-block;
                        width: 225px;
                        height: 90px;
                        line-height: 70px;
                        padding: 10px;
                        margin-left: 10px;
                        margin-bottom: 7px;  
                        writing-mode: horizontal-tb;
                        >div  {
                            display: inline-block;
                             height: 70px;
                             line-height: 70px; 
                             overflow: hidden;
                        }
                        .pro-img { 
                           
                            img {
                                width: 52px;
                                height: 52px;
                                vertical-align: middle; 
                            }
                        } 
                        .pro-text {
                            width: 153px;  
                            padding-left: 5px; 
                            
                            p {
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                font-size: 14px;  
                            }
                        }
                        &:hover{
                            .pro-text {
                                p {
                                    color: $color3;
                                }
                            }
                        } 
                    }
                }
            }
        }
    }
}
</style>