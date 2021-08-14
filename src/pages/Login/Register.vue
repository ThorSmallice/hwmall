<template>
    <div class="form">
        <h2>米麦账号注册</h2>
        
        <!-- 昵称 -->
        <div class="name inp-wrap">
            <input type="text" placeholder="用户昵称" class="inp inp-name" 
            v-model.lazy.trim="registerInfo.name">
        </div>

        <!-- 手机号 -->
        <div class="inp-phone-wrap inp-wrap">
            <span class="tip tip-phone">+86(中国)</span>
            <input type="text" placeholder="请输入手机号" class="inp inp-phone"
            v-model.lazy.trim="registerInfo.phone"
            @change="changeSmsStatus" 
            >
        </div>

        <!-- 验证码 -->
        <div class="sms inp-wrap">
            <input type="text" placeholder="验证码" class="inp inp-sms"
            v-model.lazy.trim="registerInfo.verify">
            <button class="tip tip-sms" 
            :disabled="!btnControl.smsbtnCanClick"
            :class="{'tip-sms-active' : btnControl.smsbtnCanClick }"
            @click="getSms"
            >获取验证码</button>
        </div>

        <!-- 密码 -->
        <div class="inp-pass-wrap inp-wrap">
            <input type="password" placeholder="密码" class="inp inp-pass"
            v-model.lazy.trim="registerInfo.pass"
            @change="canPass"> 
        </div>

        <!-- 确认密码 -->
        <div class="aff-pass-wrap inp-wrap" >
            <input type="password" placeholder="确认密码" class="inp inp-aff"
            v-model.lazy.trim="registerInfo.password"
            @change="verPass"
            > 
        </div>

        <button class="btn-register" @click="toregister" >注册</button>

        <div class="other">
            <router-link to="/log/login" class="a-login">已有账号？去登录~</router-link>
        </div>
    </div>
</template>

<script>
import  { Modal } from 'ant-design-vue';
export default {
    data: function() {
        return {
            // 本次验证码
            vercode:"",
            // 注册信息
            registerInfo :{
                name :"",       //  用户昵称
                phone: "",      //  手机号
                verify: "",         // 验证码

                pass:"",        // 密码
                password: ""    // 确认的密码
            },
            // 控制按钮可否点击
            btnControl: {
                smsbtnCanClick : false,     // 控制发送短信按钮
            }
        }
    },
    methods: {
        // 更改发送验证码按钮状态
        changeSmsStatus() {
            const reg = /^1[3|4|5|7|8][0-9]{9}$/;
            // 验证手机格式
            if( this.registerInfo.phone > 0 && reg.test(this.registerInfo.phone)) {
                // 格式正确 允许点击发送按钮
                this.btnControl.smsbtnCanClick = true;
            }else {
                // 格式不正确 禁用短信按钮 提示手机格式错误
                this.btnControl.smsbtnCanClick = false;
                this.$message.error("手机格式错误，请重新输入~")
            }
        },
        // 获取验证码
        getSms() {
            this.axios.post('/api/sms', {
                mobile: this.registerInfo.phone
            }).then(res => {
                // 保留本次验证码
                this.vercode = res.result.code;
                Modal.success({
                    title:"这是您本次的验证码~",
                    content:res.result.code
                })
            })
        },
        // 验证密码格式
        canPass(){
            const reg = /^[a-zA-Z0-9_-]{6,16}$/
            if (!reg.test(this.registerInfo.pass)) {
                this.$message.error("格式不正确，请重新输入6~16位不含特殊字符")
            }
        },
        // 验证密码两次输入是否一致
        verPass() {
            if(this.registerInfo.pass !== this.registerInfo.password) {
                this.$message.error("两次输入的密码不一致，请重新输入~")
            }
        },
        // 注册账号
        toregister() {
            // 验证所有数据格式
            const phoneReg =  /^1[3|4|5|7|8][0-9]{9}$/;     // 手机号验证规则
            const passReg =  /^[a-zA-Z0-9_-]{6,16}$/;     // 密码验证规则
            const regObj = {    // 注册信息状态是否验证通过 1是0否 
                name: 0,        //  用户名
                phone: 0,       // 手机号
                vercode: 0,     // 验证码
                pass : 0,       // 密码
                password:0      // 确认的密码
            }
            this.registerInfo.name.length > 0? (regObj.name = 1) : (regObj.name = 0);   // 验证昵称
            phoneReg.test(this.registerInfo.phone) ? (regObj.phone = 1) : (regObj.phone = 0);   // 验证手机号
            this.registerInfo.verify == this.vercode ? (regObj.vercode = 1) : (regObj.vercode = 0);    // 验证验证码
            passReg.test(this.registerInfo.pass)? (regObj.pass = 1) : (regObj.pass = 0);    // 验证密码格式
            this.registerInfo.password === this.registerInfo.pass? (regObj.password = 1) : (regObj.password = 0); //验证两次输入密码一致性

            const  hint = []; // 填写错误或者缺少的信息
            for (let key in regObj) {
                // 如果有信息没通过验证的 提示用户
                if (regObj[key] === 0) {
                    hint.push(key)
                }
            }
            if (!hint.length) {
                // 用户填写的信息全部通过验证
                this.axios.post("/api/register",{
                    name : this.registerInfo.name,
                    phone: this.registerInfo.phone,
                    password: this.registerInfo.password,
                    verify: this.registerInfo.verify
                }).then(res => {
                    console.log(res);
                    // 注册成功 提示成功
                    this.$message.success(res.msg);
                    // 跳转至登录页
                    this.$router.push("/log/login")
                },err => { 
                    this.$message.error(err.response.data.msg)
                })
            } else {
                const hintInfo = hint.map(item => {
                    let str = "";
                    if (item == "name") {
                        str += "昵称、"
                    } else if (item == "phone") {
                        str += "手机号码、"
                    } else if (item == "vercode") {
                        str += "验证码、"
                    }else if (item == "pass") {
                        str += "密码"
                    } else {
                        str += "确认密码"
                    }
                    return str
                })
                this.$message.error(`您的${hintInfo}未填写或格式错误！`)
            }

            
        }
         
    },  
    components: {
          
    }
}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    box-sizing: content-box;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    background-color: #fff;
    padding: 50px 30px;
    border-radius: 20px;
    width: 442px;
    margin: 0 auto;
    h2 {
        width: 100%;
        margin-bottom: 30px;
        font-size: 32px;
    }
    .inp-wrap {
        width: 100%;
        position: relative;
        margin-bottom: 30px;
        .tip {
            font-size: 12px;
            position: absolute;
            padding: 0 10px;
            top: 50%;
            transform: translateY(-50%); 
        }
        .tip-phone{
            left: 0
        }
        .tip-sms { 
            right: 0;
            cursor: not-allowed;
            background:none;
            color: rgba(21, 36, 243, 0.5) ;
            font-size: 14px;
        }
        .tip-sms-active {
            color:#007dff ;
            cursor: pointer; 
        }
        .inp {
            display: inline-block; 
            border: 1px solid rgba(0, 0, 0, 0.05); 
            height: 48px;
            width: 100%;
            line-height: 48px;
            border-radius: 8px;
            padding: 0 20px;
            font-size: 14px; 
            background-color: rgba(0, 0, 0, 0.05);
            &:focus {
                border: 1px solid #007dff;
            }
        }
        .inp-phone{
            padding-left: 70px;
        }
        .inp-sms {
            padding-right: 90px;
        }
    } 

    .btn-register { 
        margin-top: 30px;
        margin-bottom: 30px;
        width: 358px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        border-radius: 8px;
        padding: 0 10px; 
        font-size: 18px;
        font-weight: 700; 
        cursor: pointer;
        background-color: #007dff;
        color: #fff;
    }
    .btn-register-active {
        cursor: pointer;
        background-color: #007dff;
        color: #fff;
    }

    .other {
        width: 358px;
        padding: 0 30px;
        text-align: right;
        .a-login {
            color: #007dff;
            font-size: 16px;
            line-height: 30px;
            &:hover {
                color: blue;
            }
        }
     }
}
</style>