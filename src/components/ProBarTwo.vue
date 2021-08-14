<template>
    <div id="ProBarTwo">
        <!-- 商品楼层组件 8小图  --> 
        <ul class="pro-list">
            <li class="pro-item"><a href="#"></a></li>
            <li class="pro-item"><a href="#"></a></li>
            <li class="pro-item"><a href="#"></a></li>
            <li class="pro-item"><a href="#"></a></li>
            <li class="pro-item"><a href="#"></a></li>
            <li class="pro-item"><a href="#"></a></li>
            <li class="pro-item"><a href="#"></a></li>
            <li class="pro-item"><a href="#"></a></li> 
        </ul> 
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
#ProBarTwo{
    .pro-list{
        width: 100%;
        height: 785px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap; 
        .pro-item {  
            width: 290px;
            height: 387px;
            background-color: #87ceeb;  
            &:hover {
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            }
        }
    }
}
</style>