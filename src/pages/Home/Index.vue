<template>
<!-- 主页 -->
    <div id="Index">
          <main>
      <div class="container">
        <!-- 轮播区 -->
        <div class="swiper-wrap">
          <div class="swiper-box">
            <swiper :options="swiperOptions">

              <template v-for="item in carouseList">
                <swiper-slide :key="item.id"
                  >
                  <router-link to="/">
                  <img :src="item.s_photos[0].path" alt/>
                  </router-link>
                ></swiper-slide>
              </template>

              <!-- 分页器 -->
              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
          </div>

          <!-- 左右按钮 -->
          <div class="btn-wrap">
            <div class="swiper-button-prev btn-left"></div>
            <div class="swiper-button-next btn-right"></div>
          </div>
        </div>

        <!-- 左侧菜单栏 -->
        <div class="menu-wrap">
          <silderMenu :pro-list="proList"> </silderMenu>
        </div>
      </div>
    </main>

    <section>
      <div class="container">
        <!-- 新品推荐 -->
        <div class="new-pro-wrap floor">
          <ul class="new-pro-list">
            <template v-for="item in newProList">
              <li :key="item.id">
                <router-link to="/">
                  <img v-lazy="item.imgsrc" />
                </router-link>
              </li>
            </template> 
          </ul>
        </div>

        <!-- 爆款推荐 -->
        <div class="hot-style floor">
          <h2>爆款推荐</h2>
          <proBarOne
          :data-list="hotProList"
          >
          </proBarOne>
        </div>

        <!-- 手机 -->
        <div class="tel-phone floor">
          <h2>手机</h2>
          <proBarTwo
          :data-list="proPhoneList"
          >
          </proBarTwo>
        </div>
      </div>
    </section>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper"; // swiper插件
import "swiper/css/swiper.css"; // swiper插件样式
import silderMenu from "../../components/SilderMenu.vue"; // 侧边菜单栏
import proBarOne from "../../components/ProBarOne.vue"; // 商品列表组件1
import proBarTwo from "../../components/ProBarTwo.vue"; // 商品列表组件2
import { mapState } from "vuex";

export default {
data() {
    return {
        proPhoneList: [], // 手机列表
        hotProList:[],  // 爆款推荐列表
        proList: {    // 传给菜单栏组件的数据
        proClass: [], // 产品分类列表
      },
      carouseList: [], // 轮播图列表
      newProList: [
        // 新品推荐
        {
          id: 1,
          imgsrc: require('../../assets/image/xinpintuijian/1.jpg'),
        },
        {
          id: 2,
          imgsrc:require('../../assets/image/xinpintuijian/2.jpg'),
        },
        {
          id: 3,
          imgsrc: require('../../assets/image/xinpintuijian/3.jpg'),
        },
        {
          id: 4,
          imgsrc:require('../../assets/image/xinpintuijian/4.jpg'),
        },
      ],
      // swiper轮播图配置
      swiperOptions: {
        // 分页器
        pagination: {
          el: ".swiper-pagination",
          clickable: true, // 分页器可点击
        },
        // 左右按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        // 切换效果
        effect: "cube",
        // 可循环
        loop: true,
        // 自动轮播
        autoplay: {
          delay: 4000, // 延迟时间
          pauseOnMouseEnter: true, // 鼠标移入移出自动暂停开启
          disableOnInteraction: false, // 操作后依旧自动轮播
        },
        speed: 1000, // 切换速度
      },
    };
  },
  created() {
    // 获取轮播图
    const carouPic = window.sessionStorage.getItem("carouseList");
    if (carouPic) {
        this.carouseList = JSON.parse(carouPic)
    } else {
         this.axios
        .get(`/api/carousel?site_id=1&project_id=${this.userInfo.project_id}`)
        .then((res) => {
            this.carouseList = res.result.rows;
        });
    }
    // 获取左侧菜单栏分类和子商品信息
    this.axios
      .get(`/api/classify/classifyGoods?project_id=${this.userInfo.project_id}`)
      .then((res) => {
        this.proList.proClass = res.result.slice(0, 12);
    });
    // 获取爆款推荐列表
    this.axios
        .get(`/api/goods`, {
            params: {
                project_id: this.userInfo.project_id,
                classify_id: 133
            }
        })
        .then(res => { 
            this.hotProList =  res.result.rows.sort( (a, b) => {
                return a.id - b.id
        } );
    });
    // 获取手机楼层列表
    this.axios
        .get(`/api/goods`, {
            params: {
                project_id: this.userInfo.project_id,
                classify_id: 29
            }
        })
        .then(res => {
            // console.log(res);
            this.proPhoneList = res.result.rows.slice(0,8)
        })
  },

  computed: {
    ...mapState(["userInfo"]), 
  },
  watch: {
      "carouseList" :function () {
            window.sessionStorage.setItem("carouseList",JSON.stringify(this.carouseList))
      }
  },
  components:{
        Swiper,
        SwiperSlide,
        silderMenu,
        proBarOne,
        proBarTwo,
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/color.scss";
#Index {
  main {
    .container {
      position: relative;
      // 轮播图
      .swiper-wrap {
        .swiper-box {
          overflow: hidden;
          position: relative;
          left: 50%;
          margin-left: -951.5px;
          max-width: 1903px;
          height: 550px;
          .swiper-pagination {
              bottom: 40px;
          }
        }
        .swiper-container {
          --swiper-pagination-color: #fff;
        }
        .btn-wrap {
          position: absolute;
          width: 900px;
          height: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 20;
          top: 50%;
          // transform: translateY(-50%);
          right: 65px;
          .btn-left,
          .btn-right {
            position: static;
            top: 0;
            left: 0;
            right: 0;
            width: 55px;
            height: 55px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.2);
            &::after {
              color: #fff;
              font-size: 15px;
            }
          }
        }
      }

      // 左侧菜单栏
      .menu-wrap {
        position: absolute;
        z-index: 20;
        left: 0;
        top: 27px;
      }
    }
  }

  section {
    width: 100%;
    background-color: $color5;
    padding: 20px;
    .floor {
      margin-bottom: 30px;
      h2 {
          margin-bottom: 20px;
      }
    }
    // 新品推荐
    .new-pro-wrap {
      .new-pro-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        > li {
          cursor: pointer;
          width: 291px;
          height: 194px;
        //   background-color: #87ceeb;
          > a {
            display: block;
            width: 100%;
            height: 100%;
            img {
              width: 100%;
              height: 100%;
            }
          }
          &:hover {
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
          }
        }
      }
    }
    // 爆款推荐
    .hot-style {
      width: 100%;
    }
  }
}
</style>