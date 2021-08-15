<template>
    <div id="proBarOne">
        <!-- 商品楼层组件  -->
         
        <ul class="pro-list">
            <template v-for="item in getFirstData">
                <li class="pro-item" :key="item.id">
                    <a href="#">
                        <img :src="item.s_goods_photos[0].path">
                    </a>
                </li>
            </template>
            <template v-for="item in getFilterList">
                <li class="pro-item" :key="item.id">
                    <a href="#">
                        <img :src="item.s_goods_photos[0].path">
                        <h6>{{item.name}}</h6>
                        <p>￥{{item.sale_price}}</p>
                    </a>
                </li> 
            </template>
        </ul> 
    </div>
</template>

<script>
export default {
    props: {
        "data-list" : Array,    // 数据列表
    },
    computed: {
        getFirstData () {
            return this.dataList.slice(0,1);
        },
        getFilterList () {
            return this.dataList.slice(1);
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
#proBarOne{
    .pro-list{
        width: 100%;
        height: 624px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap; 
        .pro-item {
            cursor: pointer;
            width: 230px;
            height: 305px;
            background-color: #fff; 
            &:nth-child(n + 2) {
                >a {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    h6{
                        width: 183px;
                        font-size: 14px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        line-height: 30px;
                        margin-bottom: 20px;
                    }
                    p {
                        font-size:16px;
                        color: $color3;
                    }
                    img{ 
                        box-sizing: content-box;
                        width: 143px;
                        height: 143px; 
                        padding: 20px 10px 40px ;
                    }
                }
            }
            &:first-child{
                width: 472px;
                a {
                    display: block;
                    height: 100%;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
            }
            &:hover {
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            }
        }
    }
}
</style>