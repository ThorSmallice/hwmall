<template>
    <div id="Home"> 
        <header>
            <header-bar>

            </header-bar>
        </header>

        <main>

        </main>

        <footer>

        </footer>
    </div>
</template>

<script>
import headerBar from "../components/HeaderBar.vue";
export default {
    components: {
        headerBar
    }
}
</script>

<style lang="scss" scoped>
#Home{
    .header-adve {
        width: 100%;
        overflow: hidden;
        .header-img{
            height: 90px;
            position: relative;
            width: 1200px;
            margin: 0 auto;
            background-color: pink;
            a {
                position: relative;
                left: 50%;
                margin-left: -960px;
                display: block;
                text-align: center;
                width: 1920px;
                height: 90px;
                img {
                    vertical-align: top;
                }
            }
        }
    }
}
</style>