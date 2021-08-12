<template>
    <div id="footerMenu">
        <!-- footer top -->
        <div class="footer-top">
            <ul>
                <li><i class="b_icon iconfont icon-web-icon-"></i>百强企业 品质保证</li>
                <li><i class="b_icon iconfont icon-rili"></i>7天退货 15天换货</li>
                <li><i class="b_icon iconfont icon-box"></i>48元起免运费</li>
                <li><i class="b_icon iconfont icon-icon_anquan"></i>2000家服务店 全国联保</li>
            </ul>
        </div>

        <!-- footer middle -->
        <div class="footer-middle">
            <div class="middle-left">
                <dl>
                    <dt>购物相关</dt>
                    <dd>购物指南</dd>
                    <dd>配送方式</dd>
                    <dd>支付方式</dd>
                    <dd>常见问题</dd> 
                </dl>

                <dl>
                     <dt>购物相关</dt>
                    <dd>购物指南</dd>
                    <dd>配送方式</dd>
                    <dd>支付方式</dd>
                    <dd>常见问题</dd>
                </dl>

                <dl> 
                    <dt>购物相关</dt>
                    <dd>购物指南</dd>
                    <dd>配送方式</dd>
                    <dd>支付方式</dd>
                    <dd>常见问题</dd>
                </dl>

                 <dl> 
                    <dt>购物相关</dt>
                    <dd>购物指南</dd>
                    <dd>配送方式</dd>
                    <dd>支付方式</dd>
                    <dd>常见问题</dd>
                </dl>

                 <dl> 
                    <dt>购物相关</dt>
                    <dd>购物指南</dd>
                    <dd>配送方式</dd>
                    <dd>支付方式</dd>
                    <dd>常见问题</dd>
                </dl>

                 <dl> 
                    <dt>购物相关</dt>
                    <dd>购物指南</dd>
                    <dd>配送方式</dd>
                    <dd>支付方式</dd>
                    <dd>常见问题</dd>
                </dl>
            </div>

            <div class="middle-right">
                <h3>950805</h3>
                <p>7 x 24 小时客服热线 (仅收市话费)</p>
                <a href="javascript:;">
                    <i class="b_icon iconfont icon-kefu"></i>
                    在线客服
                </a>
            </div>
        </div>

        <!-- footer bottom -->
        <div class="footer-bot">
            <p>隐私声明 服务协议 COOKIES Copyright © 2012-2021 米麦贸易有限公司 版权所有 粤ICP备19015064号|粤公网安备 44190002012121号</p>
            <p>增值电信业务经营许可证：粤B2-20190762|备案主体编号：44201919072131|粤新出网备（2021）2号</p>
            <p>互联网药品信息服务资格证（粤）-非经营性-2020-0102 | 粤东食药监械经营备20203121</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import "../assets/scss/color.scss";
#footerMenu{
     width: 100%;
     /* footer top */
    .footer-top {
        height: 120px;
        display: flex;
        align-items: center;
        
        >ul {
            display: flex;
            justify-content: space-between;
            align-items: center;
            >li {
                user-select: none;
                padding: 24px 35px 24px 56px;
                width: 300px;
                height: 71px;
                line-height: 24px;
                font-size: 16px; 
                .b_icon{ 
                    font-size: 18px;
                    margin-right: 5px;
                }
            }
        }
    }

    /* footer-middle */
    .footer-middle{ 
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 56px 0 40px;
        /* middle-left */
        .middle-left{
            position: relative;
            padding: 0 30px;
            width: 952px;
            display: flex;
            justify-content: space-between;
            &::after {
                position: absolute;
                // z-index: 20;
                top: -13px;
                right: 0;
                content: "";
                display: block;
                width: 1px;
                height: 160px;
                background-color: #ccc;
            }
            >dl {
               >dt {
                    font-size: 14px;
                    color: #000;
                    margin-bottom: 32px;
                    line-height: 19px;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
               }
                >dd {
                    cursor: pointer;
                    &:hover{
                        color: $color3;
                    }
                    font-size: 12px;
                    line-height: 17px;
                    color: rgba(0,0,0,0.5);
                }
            }
        }
        /* middle-right */
        .middle-right {
            width: 248px; 
            text-align: center;
            h3{
                font-size: 24px;
                line-height: 36px;
                color:#000;

            }
            p{
                line-height: 19px;
                font-size: 13px;
                color: #000;
                margin-bottom: 20px;
            }
            a{
                display: inline-block;
                width: 170px;
                height: 34px;
                line-height: 34px;
                border-radius: 17px;
                color: #fff;
                background-color: #000;
                &:hover{
                    color: $color3;
                    background-color: $color2;
                }
            }
        }
    }
    
    /* footer bot */
    .footer-bot{
        padding: 30px;
        text-align: center;
        color: $color4;
    }
}
</style>