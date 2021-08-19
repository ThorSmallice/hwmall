<template>
    <!-- 订单结算 -->
    <div id="settle">
        <div class="container">
            <header>
                <h2>确认订单</h2>
            </header>

            <section>
                <h3>收货地址</h3>
                <!-- 收获地址列表 -->
                <ul class="address">
                    <li class="address-item" @click="showModal">
                        <p>+ 新增收获地址</p>
                    </li>
                    <template v-for="item in areaList">
                        <li class="address-item" 
                        :class="{'active' : checkArea.id == item.id }"
                        :key="item.id" 
                        @click="seletArea(item)"
                        >
                            <h4>{{item.name}} <span>{{item.phone}}</span> </h4>  
                            <p>{{item.area_name + item.desc}}</p>
                            <p>{{item.post_code}}</p>
                        </li> 
                    </template>
                </ul>
                <!-- 添加地址的对话框 -->
                <a-modal
                :title="'添加新地址'"
                :visible="modalShow" 
                dialogClass="modal-box"
                cancelText="取消"
                okText="确定"
                @ok="addAddress"
                @cancel="closeModal"
                >   
                    <div class="form-table"> 
                            <div class="tr"> 
                                <span>收货人</span>
                                <a-input 
                                class="inp" 
                                :maxLength="10" 
                                placeholder="请输入收货人姓名(必填)"
                                v-model="modalUserInfo.name"
                                > 
                                </a-input>
                            </div>
                            <div class="tr">
                                <span>手机号码</span>
                                <a-input 
                                class="inp" 
                                :maxLength="11" 
                                placeholder="请输入收货人手机号码(必填)"
                                v-model="modalUserInfo.phone"
                                >
                                </a-input>
                            </div>
                            <div class="tr">
                                <span>地址</span>
                                <a-cascader 
                                class="inp" 
                                :options="cityArr" 
                                placeholder="请选择省市区(必选)" 
                                @change="changeCity"
                                ></a-cascader>
                            </div>
                            <div class="tr textarea"> 
                                <span>详细地址</span>
                                <a-textarea 
                                class="inp inp-textarea"
                                allowClear
                                placeholder="请输入详细地址(必填)" 
                                v-model="modalUserInfo.desc"
                                > 
                                </a-textarea>
                            </div>
                            <div class="tr">
                                <span>邮政编码</span>
                                <a-input 
                                class="inp" 
                                :maxLength="6" 
                                placeholder="请输入邮政编码(选填)"
                                 v-model="modalUserInfo.post_code"
                                ></a-input>
                            </div>
                    </div>
                </a-modal>
            </section>

            <main>
                <ul>
                    <template v-for="item in calcProArr">
                        <li :key="item.id" class="calc-item">
                            <img :src="item.s_good.s_goods_photos[0].path">
                            <h3>{{item.s_good.name +( item.desc ? item.desc : "") }}</h3>
                            <p>×  {{item.num}}</p>
                            <p>￥{{item.num * item.s_good.sale_price}}</p>
                        </li>
                    </template>
                </ul>
            </main>

            <footer>
                <div class="footer-left"> 
                    <p class="head">配送至：</p> 
                    <h3>  {{ checkArea? (checkArea.area_name + checkArea.desc): "" }} </h3>
                    <p class="user">
                        <span>{{checkArea.name}}</span>
                        <span>{{checkArea.phone}}</span>
                        <span>{{checkArea.post_code? checkArea.post_code : ""}}</span>
                    </p>
                     
                </div>
                <div class="footer-right"> 
                    <p>应付总额：<span>￥{{getAllMoney}}元</span></p>  
                    <button :class="{'disable' : !checkArea}" @click="submit">提交订单</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import { Modal,Cascader,Input } from "ant-design-vue"
import { mapState } from 'vuex';
export default {
    data() {
        return {
            calcProArr:[],  // 要结算的商品列表
            checkArea: "", // 选中的地址
            modalShow: false, // 控制地址对话框显示
            areaList: [],   // 地址列表用于渲染
            cityArr : [],   // 省市区列表
            modalUserInfo: {    // 收件人信息
                name: "", // 收件人姓名
                phone: "", // 手机号码
                area:"",  // 地区id 集合
                area_name:"", // 地区名称
                desc: "",    // 详细地址
                post_code: "" // 邮政编码
            }
        }
    },
    methods: {
        // 新增收获地址
        addAddress() { 
            this.axios.post('/api/address',this.modalUserInfo).then(res => {
                // 添加成功 提示成功
                this.$message.success(res.msg); 
                // 添加到地址列表
                this.areaList.push(res.result);
                // 重置添加新地址的内容
                this.modalUserInfo = {    // 收件人信息
                    name: "", // 收件人姓名
                    phone: "", // 手机号码
                    area:"",  // 地区id 集合
                    area_name:"", // 地区名称
                    desc: "",    // 详细地址
                    post_code: "" // 邮政编码
                }
                this.modalShow =false;

            },err => {
                if (err.status === 400) {
                    this.$message.error("缺少必填参数或者格式错误!")
                } 
            })
        },
        // 选择省市区触发的回调
        changeCity( val,selectedOptions) { 
            // 更新地区id集合
            this.modalUserInfo.area = val.join(","); 
            // 更新地区名称
            selectedOptions.forEach(item => {  
                 this.modalUserInfo.area_name += item.cityname
            }) 
        },
        // 显示添加地址对话框
        showModal() {
            this.modalShow = true;
        },
        // 关闭添加地址对话框
        closeModal() {
            this.modalUserInfo = {   // 收件人信息
                name: "", // 收件人姓名
                phone: "", // 手机号码
                area:"",  // 地区id 集合
                area_name:"", // 地区名称
                desc: "",    // 详细地址
                post_code: "" // 邮政编码
            }
            this.modalShow = false;
        },
        // 点击地址 选中地址
        seletArea(item) { 
            this.checkArea = item 
        },
        // 提交订单
        submit() {
            const subGoods = []; // 商品id和num组
            const buyCars =[];  // 购物车id组
            // 根据要结算的商品列表 创建传递后台的参数
            this.calcProArr.forEach(item => {
                let pro = { // 商品组信息
                    id: item.goods_id, // 商品id
                    num:item.num    // 结算的数量
                }
                subGoods.push(pro); // 添加商品组信息
                buyCars.push(item.id); // 添加购物车id

            });

            

            this.axios.post('/api/order',{
                goods_info: subGoods,   // 商品组id和num
                addr_id: this.checkArea.id,   // 地址id
                shoppingCartIds: buyCars ,  // 购物车id组
            }).then(res => {
               
                this.$message.success(res.msg);
                // 删除本地存储中选中的商品列表
                window.sessionStorage.removeItem("checkArr");
                // 更新购物车状态
                this.$store.dispatch("getCarList", this.userInfo.project_id)
                setTimeout(() => {
                    this.$router.push('/order')
                },2000) 
            })
        }
    },
    created() {
        // 获取省市区
        this.axios.get('/api/city').then(res => { 
            this.cityArr = res.result
        });
        // 获取已有地址
        this.axios.get('/api/address').then(res => { 
            this.areaList = res.result;
        });
        // 获取要结算的商品
        if (window.sessionStorage.getItem("checkArr")) {
            this.calcProArr = JSON.parse(window.sessionStorage.getItem("checkArr"));
        } 
    },
    computed: {
        ...mapState(['userInfo']),
        // 计算支付总价
        getAllMoney() {
            let sum = 0;
            this.calcProArr.forEach(item => {
                sum += (item.num * item.s_good.sale_price)
            })
            return sum
        }
    },
    components: {
        "a-modal": Modal,  
        "a-input":Input,
        "a-cascader":Cascader
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/color.scss';
#settle {
     background-color: #f5f5f5; 
     padding: 20px 0;
    header,section,main {
        width: 100%; 
        margin-bottom: 20px;
    }
    header {
        // margin-bottom: 10px;
        h2 {
            font-size: 18px;
            line-height: 30px;
            font-weight: 600;
        }
    }
    section {
        background-color: #fff;
        padding: 20px 20px 20px 40px; 
        .address {
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;
            width: 100%; 
            min-height: 30px;
            margin-top: 10px;
            .address-item {
                 cursor: pointer;
                width: 368px;
                height: 120px;
                border: 1px solid #ccc;
                margin-right: 10px;
                margin-bottom: 10px;
                padding: 10px;
                &.active {
                    border: 2px solid $color3;
                }
                p {
                    font-size: 14px;
                    color: $color6;
                }
                &:first-child { 
                    padding: 0;
                    line-height: 120px;
                    text-align: center; 
                }
                &:nth-child(n+2) {
                    h4 {
                        font-size: 18px;
                        span {
                            margin-left: 20px;
                        }
                    }
                    p {
                        width: 320px; 
                        font-size: 14px;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2; 
                        margin-bottom: 10px;
                    }
                }
            }

        }
        
    }
    main {
        background-color: #fff;
         padding: 20px 20px 20px 40px; 
         ul {
             .calc-item {
                 margin: 0 auto;
                 display: flex;
                 width: 760px;
                 justify-content: space-evenly;
                 align-items: center;
                 img {
                     width: 100px;
                     height: 100px;
                 }
                 h3 {
                     width: 360px;
                     line-height: 20px;
                     height: 40px;
                     overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;  
                 }
                 p {
                     width: 120px;
                    line-height: 20px;
                     height: 40px;
                     font-size: 18px;
                 }
             }
         }
    }
    footer {
        display: flex;
        justify-content: space-between;
        background-color: #fff;
         padding: 20px 20px 20px 40px; 
         height: 145px;
         width: 100%; 
         .footer-left { 
             width: 300px;
             height: 105px;
             padding: 10px;
             border: 1px solid #fbd4c4;
             background-color: #fef6f3;
             border-radius: 5px;
             .head {
                 font-size: 14px;
             }
             h3 {
                 width: 100%;
                 font-size: 12px;
                 line-height: 20px;
                 height: 40px;
                  overflow: hidden; 
                  margin-top: 5px;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;  
             }
             .user {
                 span {
                     font-size: 13px;
                     margin-right: 10px;
                     line-height: 20px;
                 }
             }
             h3,.user {
                 padding-left: 20px;
             }
         }
         .footer-right {
             height: 105px;
             line-height: 105px;
             padding: 0 20px;
            //  width: ;
            //  background-color: pink;
             p {
                 display: inline-block;
                 margin-right: 20px;
                 font-size: 18px;
                 span {
                     font-size: 30px;
                     color: $color3;
                 }
             }
             button{ 
                 cursor: pointer;
                 display: inline-block;
                 width: 200px;
                 height: 50px;
                 line-height: 50px;
                 color: #fff;
                 background-color: $color3;
                 text-align: center;
                 font-size: 18px;
                 &.disable {
                     cursor: not-allowed;
                     background-color: #ccc;
                 }
             }
         }
    }
}


/* 地址栏对话框 */
.modal-box  {
    .form-table {
        .tr {
            width: 100%;
            display: flex;
            height: 32px;
            line-height: 32px;
            margin-bottom: 15px;
            >span {
                width: 80px;
            }
            .inp { 
                width: 400px ; 
            }
        }
        .textarea {
            height: auto;
            .inp-textarea {
                min-height: 55px;
            }
        }
    }
}
</style>