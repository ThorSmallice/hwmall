<template>
    <div id="Order">
        <div class="container">
            <header>
                  <h2>我的订单</h2>
            </header>

            <section>
                <ul class="order-list">
                    <template v-for="item in orderList">
                        <li :key="item.id" class="order-item">
                            <div class="goodtitle">
                                <p>创建时间：{{item.createdAt}}</p>
                                <p>订单编号：{{item.order_id}}</p>
                            </div>
                            <ul class="detail-list">
                                <template v-for="good in item.goods_info">
                                    <li :key="good.id" class="detail-item">
                                         <img v-lazy="good.s_goods_photos[0].path">
                                        <h3>{{good.goods_name + (good.desc? good.desc : "" )}}</h3>
                                        <p>×{{good.num}}</p>
                                        <p class="y-price">原价￥{{good.price}}元</p>
                                        <p>现价￥{{good.sale_price}}元</p>
                                        <p>小计￥{{good.num * good.sale_price}}元</p>
                                    </li>
                                </template>

                                <li  class="allMoney">订单金额：￥{{item.total_price}} 元</li>
                            </ul>
                           
                        </li>
                    </template>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            orderList: [],  // 订单列表
        }
    },
    methods: {
         
    },
    created() {
        this.axios.get('/api/order').then(res => { 
            res.result.rows.forEach(item => {
                item.goods_info = JSON.parse(item.goods_info)
            })
            this.orderList = res.result.rows 
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/color.scss';
#Order {
    background-color: #f5f5f5; 
    padding: 20px 0;
    header,section,main {
        width: 100%;
        margin-bottom: 20px
    }
    section {
        .order-list {
            .order-item {
                background-color: #fff;
                margin-bottom: 20px;
                border-radius: 15px;
                overflow: hidden;
                
                .goodtitle {
                    background-color: rgb(53, 130, 245);
                    p {
                        display: inline-block;
                        margin-right: 40px;
                        color: #fff;
                        line-height: 40px;
                        padding: 5px 20px;
                        font-size: 14px;
                    }
                }

                .detail-list {
                    padding: 20px 20px;
                    .detail-item {
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;
                        margin-bottom: 20px;
                        img {
                            width: 100px;
                            height: 100px;
                        }
                        h3 {
                            width: 520px;
                            height: 50px;
                            overflow: hidden;
                            display: -webkit-box;
                            text-overflow: ellipsis;
                            -webkit-line-clamp: 2;
                            -webkit-box-orient: vertical;  
                        }
                        p {
                            width: 90px;
                            font-size: 12px;
                            &.y-price {
                                text-decoration: line-through;
                            }
                        }
                    }
                    .allMoney{
                        padding-right: 40px;
                        line-height: 30px;
                        font-size: 16px;
                        text-align: right;
                    }
                }
            }
        }
    }
}
</style>