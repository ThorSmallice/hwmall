<template>
  <div class="form">
    <h2>米麦账号登录</h2>
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
    >{{ isLogin }}</button>
    <div class="other">
      <router-link to="/log/register" class="a-register">注册</router-link>
    </div>
  </div>
</template>

<script>
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
        toLogin() {
            this.axios.post('/api/login',{
                phone: this.logInfo.account,    // 传入用户名
                password: this.logInfo.password // 传入密码
            })
            .then(res => {
                // console.log(res);
                this.$message.success(res.msg);
                const userInfo = {
                    id:  res.result.id, //项目id
                    username: res.result.name, // 用户昵称
                    token: res.result.token,    // 用户token
                    project_id: res.result.project_id, // 项目id
                };
               
                // 存储用户token
                window.sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
                // token值更新到vuex
                this.$store.commit("updateUserInfo",userInfo);
                // 重置输入框信息
                this.logInfo = {
                    account:"18664780445",     // 账户名
                    password: "123456",   // 密码    
                }
                // 跳转到主页
                this.$router.push("/");

            },
            err => {
                console.log(err);
                this.$message.error(err.data.msg);
            })
        }
    },
    computed: {
        isLogin() {
            if(this.$store.state.userInfo.token) {
                return `已登录`
            } else {
                return `登录`
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