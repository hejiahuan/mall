<template>
  <div class="detail">
      <detail-nav-bar/>
      <detali-swiper :topImages="topImages"/>
      <detail-basic-info :goods="goods"/>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar"

  import {getDetailDatas,Goods} from "network/detail"

  import DetaliSwiper from "./childComps/DetailSwiper"

  import DetailBasicInfo from "./childComps/DetailBasicInfo"


  export default {
    name: "detail",
    data() {
      return {
        iid: null,
        topImages:[],
        goods:{}
      }
    },
    components:{
      DetailNavBar,
      DetaliSwiper,
      DetailBasicInfo
    },
    created() {
      this.iid = this.$route.params.id;
      // 这里请求数据在request.js中

      getDetailDatas(this.iid).then(res=>{
        const data=res.data.list[0];
          //1获取顶部的图片轮播数据
        this.topImages=data.topImage;

        //2获取商品的详细信息
        this.goods=new Goods(data.itemInfo,data.columns,data.shopInfo.services);
      })
    }
  }
</script>

<style scoped>
  .detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
