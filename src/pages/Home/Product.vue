<template>
    <div id="product">
        <div class="container">
            <!-- 商品主图和规格 -->
            <div class="pro-info">
                <!-- 主图和放大镜 -->
                <div class="pro-show">
                    <pic-zoom :carouselArr="picArr"></pic-zoom>
                </div>

                <div class="pro-speci">
                    <!-- 商品信息 -->
                    <div class="pro-title">
                         <h3>{{proInfo.name}}</h3>
                         <p>{{proInfo.desc}}</p>
                    </div>
                    
                   
                   <div class="pro-price m_table"> 
                        <div class="price m_tr">
                            <label>价格</label><span>￥{{proInfo.price}}  元</span>
                        </div>
                        <div class="redu-price m_tr">
                            <label>优惠价格</label><span>￥{{proInfo.sale_price}} 元</span> 
                        </div> 
                   </div>

                   <div class="buy m_table">
                        <div class="m_tr">
                            <label>库存</label><span>{{proInfo.stock_num}}</span>
                        </div>
                        <div class="m_tr">
                            <label>数量</label><a-input-number class="pro-num" :min="1" v-model="proNum"  decimalSeparator="0"/>&nbsp;&nbsp;件
                        </div>
                       <div class="m_tr">
                            <label></label>
                            <a href="javascript:;" class="join-car" @click="joinCar($route.params.id)">加入购物车</a> 
                            <a href="javascript:;" class="join-car">立即购买</a> 
                       </div>
                       
                   </div>
                </div>
            </div>
        </div>

        <!-- 商品详情 -->
            <section class="pro-details" v-html="proInfo.rich_text">  
                
            </section> 
    </div>
</template>

<script>
import picZoom from "../../components/picZoom.vue";
import {InputNumber} from 'ant-design-vue';
export default {
    data() {
        return { 
            proInfo : [],   // 商品详情信息
            proDetailsHtml: "", // 商品详情内容
            proNum : 1, // 选择商品的数量
            picArr: [], // 主图列表
        }
    },
    methods: {
        // 加入购物车
        async joinCar(goodsId) {
            await this.axios.post('/api/shoppingCart', {
                goods_id:  goodsId, // 商品id
                num: this.proNum
            }).then(res => {
                 
                if(res.msg === '加入购物车') { 
                    this.$message.success("成功加入购物车~")  
                }else {
                    this.$message.error(res.msg)
                }
            }) 
            // 重新获取购物车列表 更新到vuex
            this.axios.get('/api/shoppingCart', {
                params :{
                    "project_id" : this.$store.state.userInfo.project_id
                }
            }).then(res => { 
                this.$store.commit("updataCar",res.result)
            })
        }
       
        
    },
    components: {
        picZoom,
        "a-input-number":InputNumber,
    },
    created() {
        this.axios.get(`/api/goods/${this.$route.params.id}`).then(res => {
            // console.log(res);
            this.proInfo = res.result;
            this.picArr = res.result.s_goods_photos
             this.proDetailsHtml = res.result.rich_text
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/color.scss';
#product {
    .pro-info {
        display: flex;
        justify-content: space-between;
        width: 100%;
        min-height: 550px;
        // background-color: pink;
        .pro-show{
            width: 450px;
            background-color: #87ceeb;
        }
        // 商品信息
        .pro-speci {
            width: 730px;
            padding-left: 30px;
            >div {
                margin-bottom: 20px;
            }
            // 商品名 描述
            .pro-title {
                width: 650px;
                h3,p {
                    color: $color6;
                }
               h3 { 
                    font-size: 21px;
                    line-height: 40px;
                    font-weight: 500;
               } 
               p {
                   font-size: 14px;
                    line-height: 20px;
               }
            }
            .m_table {
                .m_tr {
                    label {
                        display: inline-block;
                        width: 85px;
                        padding: 0 20px 0 15px;
                        min-height: 30px;
                        line-height: 30px;
                        text-align: justify;
                        text-align-last: justify; 
                        font-size: 12px;
                    }
                    span {
                        font-size: 12px;
                    }
                }
            }
            
            .pro-price {
                padding-top: 15px;
                min-height: 85px;
                background-color: #f5f5f5;
                // 价格
                .price { 
                    span{
                        font-size: 18px;
                        text-decoration: line-through;
                    }
                }
                // 优惠价格
                .redu-price { 
                    span {
                        font-size: 24px;
                        color: $color3; 
                    }
                } 
            }
            
            // 选择数量 购物车
            .buy {
                .pro-num {
                    width: 80px;
                    // outline: 1px solid #87ceeb;
                    height: 40px;
                    line-height: 40px;
                    font-size: 15px; 
                    padding-left: 5px;
                    // border: 1px solid #ccc;
                    // &:focus{
                    //     border: 2px solid #87ceeb; 
                    // }
                }
                .m_tr {
                    margin-bottom: 25px;
                }
                .join-car {
                    display: inline-block;
                    width: 200px;
                    height: 45px;
                    line-height: 45px;
                    text-align: center;
                    color: #fff;
                    font-size: 18px;
                    background-color: $color3;
                    border-radius: 10px;
                    margin-right: 20px;
                    &:hover{
                        background-color: rgba(207, 10, 44,.6);
                    }
                }
            }
           
        }

        
    }
    section {
        p {
            width: 100%;
            img {
                width: 100%;
            }
        }
    }
}

</style>