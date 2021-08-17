<template>
  <div id="Car">
    <div class="container">
      <header>
        <h2>我的购物车</h2>
      </header>
      <main>
            <div class="table">
                <div class="table-header">
                    <div>
                        <span><input class="inpcheck" type="checkbox" :checked="allCheck" @change="checkAll" />全选</span>
                        <span>商品名称</span>
                        <span>单价</span>
                        <span>数量</span>
                        <span>小计</span>
                        <span>操作</span>
                    </div>
                </div> 

                <div class="table-body">
                    <template v-for="item in getBuyList">
                        <div class="body-item" :key="item.id">
                            <span><input 
                            class="inpcheck" 
                            type="checkbox" 
                            :checked="item.isCheck"
                            @change="changCheckItem(item)"
                            /><img v-lazy="item.s_good.s_goods_photos[0].path"></span> 
                            <span>{{item.s_good.desc? (item.s_good.name + item.s_good.desc) : item.s_good.name }}</span>
                            <span>¥ {{item.s_good.sale_price}}</span>
                            <span><input type="number" :value="item.num" min="1" class="numInp" 
                            @change="changeNum($event,item)"
                            @blur="updataProBuy($event,item)"
                            /></span>
                            <span>¥ {{item.s_good.sale_price * item.num }}</span>
                            <span><a href="javascript:;" class="delBtn" @click="delItem(item.id)">删除</a></span>
                        </div>
                    </template>
                </div>

                <div class="table-footer">
                    <div class="oper">
                         <span><input class="inpcheck" type="checkbox" :checked="allCheck" @change="checkAll"/>全选</span>
                         <span><a href="javascript:;" @click="delSome">删除</a></span> 
                    </div>
                    <div class="oper-right">
                        <div class="calc">
                            <p>总计：<span>￥{{getTotalMoney}} 元</span></p> 
                            <p>已选择<span>{{checkArr.length}}</span> 件商品</p>
                        </div>

                        <button :disabled="getCanCalc" :class="{'disab' :  getCanCalc}" @click="toCalc">立即结算</button>
                    </div>
                </div>
            </div>
      </main>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    data() {
        return {
            allCheck: false, // 是否全选  
            checkArr: [], // 选中的商品列表
        }
    },
    methods: {
        // 获取购物车列表
        getCarList() {
            // 获取购物车列表 更新到vuex
            this.axios.get('/api/shoppingCart', {
                params :{
                    "project_id" : this.userInfo.project_id
                }
            }).then(res => { 
                this.$store.commit("updataCar",res.result)
            })
        },
        // 更改单个商品选中状态
        changCheckItem(val) {
            val.isCheck = !val.isCheck
           
            if (val.isCheck) { // 如果选中状态的 把这个添加进选中的商品列表 提交订单时要用
                this.checkArr.push(val); 
            }else {
                this.checkArr = this.checkArr.filter(item => {
                    return item.id !== val.id
                })
            }
            // console.log(this.checkArr);

            // 遍历所有商品 判断是否全选
            this.allCheck = this.getBuyList.every(item => {
                return item.isCheck
            }) 
        },
        // 全选
        checkAll() {
            // 更改全选状态
            this.allCheck = !this.allCheck
            if (this.allCheck) {
                // 如果处于全选状态 
                this.getBuyList.forEach(item => {
                    item.isCheck = true;    // 全部商品选中状态改为true
                    this.checkArr.push(item); // 全部商品添加进选中列表
                })
            } else {
                this.getBuyList.forEach(item => {
                    item.isCheck = false;   // 全部商品选中状态改为false
                })
                this.checkArr = []  // 清空选中商品的列表
            }
        },
        // 更改购物车商品的数量
        changeNum(e,item) {
            // 更改购物车商品数量 这里同时页更新了vuex里面的数据
            item.num = e.target.value; 
            
        },
        // 更新购物车单个商品的数量
        async updataProBuy(e,item) {
            // 发送请求更改后端的 
            await this.axios.put(`/api/shoppingCart/${item.id}`,{
                num: e.target.value
            }).then(res => { 
                console.log(1);
                if (res.msg === "成功操作") {
                     item.num = res.result.num
                }
            })
            // 更新购物车状态
            this.getCarList()

        },
        // 删除单个商品
        async delItem(id) {
           let res = await this.axios.delete(`/api/shoppingCart/${id}`)
           console.log(res);
           if (res.msg === "删除成功") {
               this.$message.success(res.msg);
                // 更新购物车状态
                this.getCarList()
           }
        },
        // 删除选中商品
        delSome() {
            if ( !this.checkArr.length  ) return this.$message.warning('您的购物车空空如也~');
            const delArr = []; // 存储删除商品的请求
            // 声明这个函数用于创建删除请求
            const  delOne = async (id) => {
                return await this.axios.delete(`/api/shoppingCart/${id}`).then(res => {
                    return res
                },err => {
                    return err
                })
            }
            // 根据选中商品的数量创建多个请求
            this.checkArr.forEach(item => {
                delArr.push(delOne(item.id))
            });
            
            // 全部请求同步返回 再执行清空选中的数组 
            Promise.all(delArr).then(res => {
                let resResult = res.every(item => {
                    return item.msg === "删除成功"
                })
                if (resResult) {
                    // 清空选中列表
                      this.checkArr = [];
                    // 更新购物车状态
                    this.getCarList()
                }  
            },err => {
                this.$message.error(err.msg)
            }) 
        },
        // 结算
        toCalc() {
            console.log(111);
        }
    },
    computed:{
        ...mapState(['userInfo']),
        // 处理购物车中的商品列表
        getBuyList() {  // input框的选择状态需要跟商品挂钩 这里更改数据结构 增加多一个isCheck
            let buyList = []; // 存放购物车的商品列表
            buyList = [...this.userInfo.buyCar] 
            buyList.forEach(item => {
                item["isCheck"] = false;  // 添加是否选中属性 默认不选中
            }) 
            return buyList
        },
        // 计算总价
        getTotalMoney() {
            let total = 0;
            if (this.checkArr.length) {
                this.checkArr.forEach(item => {
                    total += item.num * item.s_good.sale_price
                })
            }
            return total
        },
        // 获取结算按钮是否允许点击
        getCanCalc() {
            // console.log(this.checkArr);
            if (this.checkArr.length) {
                return false;
            }else {
                return true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
#Car {
  padding: 20px 0;
  background-color: #f5f5f5;
  main {
    width: 100%;
    .table {
        padding: 10px 20px;
        >div {
            padding-left: 30px;
            background-color: #fff; 

            div {
                input {
                    width: 14px;
                    height: 14px;
                    margin-right: 20px; 
                    vertical-align: middle; 
                }
            }
        }
        .table-header {
            height: 40px;
            line-height: 40px;
            margin-bottom: 20px;
            >div {
                span {
                    display: inline-block;
                    color: $color4;
                    font-size: 12px;

                    margin-left: 10px;
                    &:first-child { 
                        width: 150px; 
                    }
                    &:nth-child(2) {
                        width: 450px;
                    }
                    &:nth-child(n+3) {
                        width: 100px;
                    }
                }
            }
        }

        .table-body{
            margin-bottom: 20px;
            .body-item {
                display: flex;
                align-items: center;
                height: 138px;
                line-height: 138px;
                span {
                    height: 138px;
                    line-height: 138px;
                    display: inline-block;
                     color: $color6;
                    font-size: 12px;
                    margin-left: 10px;
                    .numInp {
                        width: 80px;
                        height: 30px;
                        line-height: 30px;
                        font-size: 14px;
                        color: $color6;
                        padding-left: 8px;
                        border-radius: 8px;
                        border: 1px solid #ccc;
                        &:focus{
                            border-color: #87ceeb;
                        }
                    }
                    &:first-child { 
                        width: 150px; 
                        img {
                            width: 100px;
                            height: 100px;
                        }
                    }
                    &:nth-child(2) {
                        width: 450px; 
                        padding-right: 20px;
                        line-height: 25px;  
                        height: 100px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;
                    }
                    &:nth-child(n+3) {
                        width: 100px;
                    }
                    .delBtn {
                        display: inline-block;
                        box-sizing: content-box;
                        width: 40px;
                        height: 20px;
                        padding: 10px 20px;
                        border-radius: 8px;
                        line-height: 20px;
                        font-size: 12px;
                        text-align: center;
                        background-color: $color5;
                        color: $color6;
                        &:hover{
                            background-color: $color3;
                            color: #fff;
                        }
                    }
                }
            }
        }

        .table-footer {
            display: flex;
            justify-content: space-between;
            height: 60px;
            line-height: 60px;
            span {
                margin-left: 10px;
            }  
            .oper-right {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .calc { 
                    display: inline-block;
                        line-height: 20px;
                        padding: 10px 20px; 
                    p {
                        &:first-child {
                            font-size: 14px;
                            span {
                                color: #ca151e;
                                font-size: 18px;
                                font-weight: 600;
                            }
                        }
                        &:nth-child(2) {
                            font-size: 10px;
                            color: #a4a4a4;
                            span {
                                color: #ca151e; 
                            }
                        }
                    }
                }
                button {
                    cursor: pointer;
                    display: inline-block;
                    width: 180px;
                    background-color: $color3;
                    line-height: 60px;
                    color: #fff;
                    font-size: 18px;
                    text-align: center;
                    &:hover {
                        background: rgba(243, 14, 14, 0.8);
                    }
                    &.disab {
                        background-color: $color2;
                        cursor: not-allowed;
                    }
                }
                
            }
        }
    }
  }
}
</style>