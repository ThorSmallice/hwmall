<template>
    <div id="silderMenu">
        <ul class="ul-silder">
            <li>
                <a href="#">手机</a>
                <div class="silder-prolist-wrap">
                    <ul class="silder-item-prolist clearfix">
                        <li class="pro-item">1</li>
                        <li class="pro-item">2</li> 
                    </ul>
                </div>
            </li>
            <li><a href="#">智能穿戴</a></li>
            <li><a href="#">耳机音箱</a></li>
            <li><a href="#">智慧屏</a></li>
            <li><a href="#">电脑</a></li>
            <li><a href="#">平板</a></li>
            <li><a href="#">智能路由</a></li>
            <li><a href="#">配件</a></li>
            <li><a href="#">生态产品</a></li>
            <li><a href="#">家用电器</a></li>
            <li><a href="#">美食酒饮</a></li>
            <li><a href="#">增值服务/企业商用</a></li>
        </ul>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import './../assets/scss/color.scss'; 
#silderMenu{
    width: 200px;
    height: 496px;
    padding: 8px 0;
    background-color: #fff;
    // border-radius: 5px;
    box-shadow: rgb(0 0 0 / 10%) 0px 5px 10px;

    .ul-silder {
        >li {
            padding: 0 10px 0 24px;
            position: relative;
            cursor: pointer;
            line-height: 40px;
            &::after{
                display: inline-block;
                content: "";
                position: absolute;
                width: 12px;
                height: 12px; 
                background: url(../assets/image/public/jiantouright.png) no-repeat;
                background-size: 12px 12px;
                top: 50%; 
                right: 10px; 
                margin-top: -6px;
                font-size: 12px;
            }
            >a{
                color: $color4;
                font-size: 14px;
            }
            &:hover{
                 background-color: rgb(238, 235, 235); 
                >a{
                    color: $color3; 
                }
                >.silder-prolist-wrap{
                    display: block;
                }
            }
            .silder-prolist-wrap{
                display: none;
                position: absolute;
                top: -8px;
                left: 200px; 
                background-color:#fff;  
                .silder-item-prolist {   
                    padding: 8px 8px 0 8px;
                    writing-mode: vertical-lr; 
                    height: 496px;  
                    .pro-item{  
                        display: inline-block;
                        width: 200px;
                        height: 90px;
                        padding: 10px;
                        margin-left: 10px;
                        margin-bottom: 7px;
                        background-color: pink;
                        writing-mode: horizontal-tb;
                    }
                }
            }
        }
    }
}
</style>