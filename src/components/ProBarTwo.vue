<template>
    <div id="ProBarTwo">
        <!-- 商品楼层组件 8小图  --> 
        <ul class="pro-list">
            <template v-for="item in dataList">
                <li class="pro-item" :key="item.id">
                    <router-link :to="`/product/${item.id}`">
                        <img v-lazy="item.s_goods_photos[0].path">
                        <h6>{{item.name}}</h6>
                        <span>{{item.desc}}</span>
                        <p>￥{{item.sale_price}}</p>
                    </router-link>
                </li>

            </template>
        </ul> 
    </div>
</template>

<script>
export default {
    props:{
        "data-list" : Array
    }
}
</script>

<style lang="scss" scoped>
@import  "../assets/scss/color.scss";
#ProBarTwo{
    .pro-list{
        width: 100%;
        height: 785px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap; 
        .pro-item {  
            cursor: pointer;
            width: 290px;
            height: 387px;
            background-color: #fff;  
            >a{
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                padding: 30px 0 0 0;
                height: 100%;
                text-align: center;
                img{
                    width: 180px;
                    height: 192px;
                    margin-bottom: 30px;
                }
                h6{
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: 600;
                    width: 243px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                     margin-bottom: 20px;
                }
                span {
                    display: block;
                    color:$color2;
                    font-size: 13px;
                    line-height: 18px;
                    width: 243px;
                    height: 18px;
                     overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                     margin-bottom: 20px;
                }
                p {
                    font-size: 16px;
                    color:$color3;
                    line-height: 22px;
                }
            }
            &:hover {
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            }
        }
    }
}
</style>