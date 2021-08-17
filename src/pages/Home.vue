<template>
  <div id="Home">
    <header>
      <header-bar></header-bar>
    </header>

    <main>
        <router-view></router-view>
    </main>
   
    <footer>
      <div class="container">
        <footerMenu></footerMenu>
      </div>
    </footer>
  </div>
</template>

<script>
import headerBar from "../components/HeaderBar.vue"; // 顶部导航栏 菜单
import footerMenu from "../components/FooterMenu.vue"; // footer组件
export default {
  
  components: {
    headerBar, 
    footerMenu,
  },
};
</script>

<style lang="scss" scoped>

</style>