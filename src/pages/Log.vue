<template>
        <div id="login">
           <header>
               <div class="container">
                   <!-- 商城LOGO -->
                    <div class="logo">
                        <img src="../assets/image/public/logo.jpg" @click="$router.push('/')">
                    </div>
               </div>
           </header>

           <main>
                <transition 
                enter-active-class="animate__animated animate__fadeInLeft" 
                >
                    <router-view></router-view> 
                </transition>
           </main>

           <footer>
               <div class="container"> 
                    <footer-menu></footer-menu>
               </div>
           </footer>
        </div>
</template>

<script> 
import FooterMenu from "../components/FooterMenu.vue"
export default {
    components: { 
        FooterMenu
    }
}
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
#login{
    header {
        width: 100%;
        background-color: #fff; 
        padding: 20px 0; 
        .logo {
            width: 358px; 
            height: 60px;
            text-align: center; 
            img {
                cursor: pointer;
                height: 100%;
            }
        }
        margin-bottom: 10px;
    }
    main {
        background-color: $color5;
        padding: 100px 0;
    }
}
</style>