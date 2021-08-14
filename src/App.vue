<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {

    // created() {
    //     // 获取本地用户信息 如果存在
    //     let userInfo = window.sessionStorage.getItem("userInfo"); 
    //     // 更新到vuex
    //     userInfo && this.$store.commit('updateUserInfo', JSON.parse(userInfo))
    // }
};
</script>

<style>
</style>