<template>
    <div id="proBarOne">
        <!-- 商品楼层组件  -->
         
        <ul class="pro-list">
            <li class="pro-item"><a href="#"></a></li>
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
#proBarOne{
    .pro-list{
        width: 100%;
        height: 624px;
        display: flex;
        justify-content: space-between;
        align-content: space-between;
        flex-wrap: wrap; 
        .pro-item {
            width: 230px;
            height: 305px;
            background-color: #87ceeb; 
            &:first-child{
                width: 472px;
            }
        }
    }
}
</style>