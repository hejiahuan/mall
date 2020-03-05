<template>
  <div class="detail">
    <detail-nav-bar class="nav"/>

    <!--需要滚动的东西加入-->
    <better-scroll class="content">
      <detali-swiper :topImages="topImages"/>
      <detail-basic-info :goods="goods"/>
      <goods-list :goods="recommend"/>
    </better-scroll>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar"

  import {getDetailDatas, getRecommend, Goods} from "network/detail"

  import DetaliSwiper from "./childComps/DetailSwiper"

  import DetailBasicInfo from "./childComps/DetailBasicInfo"

  // 引入betterScroll

  import BetterScroll from "components/common/scroll/Scroll"

  // 引入goodlist

  import GoodsList from "components/content/goods/GoodsList"

  export default {
    name: "detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        recommend:[]
      }
    },
    components: {
      DetailNavBar,
      DetaliSwiper,
      DetailBasicInfo,
      BetterScroll,
      GoodsList
    },
    created() {
      this.iid = this.$route.params.id;
      // 这里请求数据在request.js中

      getDetailDatas(this.iid).then(res => {
        const data = res.data.list[0];
        //1获取顶部的图片轮播数据
        this.topImages = data.topImage;

        //2获取商品的详细信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);


        //3请求推荐数据
        getRecommend().then(res => {
           this.recommend=res.data.list
        })
      })
    }
  }
</script>

<style scoped>
  .detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    /*//这里的父类元素是detail---100vh就是100%的视口高度*/
    height: 100vh;
  }

  .content {
    /*100%的高度都是相对于父类元素的*/
    height: calc(100% - 93px);
  }

  .nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
