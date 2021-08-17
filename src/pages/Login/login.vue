<template>
  <div class="form">
    <h2>米麦账号登录</h2>
    <div v-if="!isLogin">
        <input type="text" placeholder="手机/邮箱地址/账号名" 
        class="inp inpUser" 
        v-model.trim="logInfo.account"
        />

        <input type="password" 
        placeholder="密码" 
        class="inp inpPass" 
        v-model.trim="logInfo.password"
        @keyup.enter="toLogin"
        />

        <button class="btn-login"
        :class="{'btn-login-active' : logbtnCanClick}"
        @click="toLogin" 
        >登录</button>
    </div>
    <div v-else>
        <h2>{{userInfo.username}}</h2>
        <button class="btn-login btn-login-active"
        @click="toLogOut"
        >退出登录</button>
    </div>

    <div class="other">
      <router-link to="/log/register" class="a-register">注册</router-link>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
export default {
    data: function() {
        return {
            logbtnCanClick : false, // 控制登录按钮是否可点击 
            logInfo: {       // 登录信息
                account:"18664780445",     // 账户名
                password: "123456",   // 密码    
            }
        }
    },
    methods:{
        // 登录
        async toLogin() {
            let loginRes = await this.axios.post('/api/login',{
                phone: this.logInfo.account,    // 传入用户名
                password: this.logInfo.password // 传入密码
            }).then(res => {
                return res
            }).catch(err => {
                return err
            }); 
            
            if (loginRes.status === 409) {  // 账号或者密码错误 提示用户 并且打断后续代码执行
                return this.$message.error(loginRes.data.msg)
            }

            let buyCarRes = await this.axios.get('/api/shoppingCart',{
                params :{
                   "project_id" : loginRes.result.project_id
                },
                headers: {
                    "x-token" : loginRes.result.token
                }
            })
           
            const userInfo = {
                id:  loginRes.result.id, //项目id
                username: loginRes.result.name, // 用户昵称
                token: loginRes.result.token,    // 用户token
                project_id: loginRes.result.project_id, // 项目id
                buyCar : buyCarRes.result   // 购物车信息
            };
            

            // token值更新到vuex
            this.$store.commit("updateUserInfo",userInfo);

            console.log(loginRes);
             this.$message.success(loginRes.msg);

            // 重置输入框信息
            this.logInfo = {
                account:"18664780445",     // 账户名
                password: "123456",   // 密码    
            }
            // 跳转到主页
            this.$router.push("/");
            
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
            }) 
        }
    },
    computed: {
        ...mapState(["userInfo"]),
        isLogin() {
            if(this.userInfo) { 
                return  true
            } else {
                return false
            } 
        }
    },
    created() {
       
    },
    watch: {
        // 监听输入框 
        logInfo: {
            handler : function () {
                // 输入框都输入内容了 就允许登录按钮点击
                if (this.logInfo.account.length > 0 && this.logInfo.password.length > 0) {
                    this.logbtnCanClick = true; 
                }else {
                    this.logbtnCanClick = false;
                }
            },
            deep: true
        }
    }
};
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
  h2 {
    width: 358px;
    margin-bottom: 30px;
    font-size: 32px;
  }
  width: 400px;
  margin: 0 auto;
  .inp {
    margin-bottom: 30px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    width: 358px;
    height: 48px;
    line-height: 48px;
    border-radius: 8px;
    padding: 0 10px;
    font-size: 14px;
    background-color: rgba(0, 0, 0, 0.05);
    &:focus {
      border: 1px solid #007dff;
    }
  }

  .btn-login {
    cursor: pointer;
    margin-top: 30px;
    margin-bottom: 30px;
    width: 358px;
    height: 48px;
    line-height: 48px;
    text-align: center;
    border-radius: 8px;
    padding: 0 10px;
    color: rgb(255, 255, 255, 0.9);
    font-size: 18px;
    font-weight: 700;
    background-color: rgba(245, 37, 37, 0.3);
  }
    .btn-login-active {
        background-color: #ca141d;
        color: #fff;
    }

    .other {
        width: 358px;
        padding: 0 30px;
        text-align: right;
        .a-register {
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