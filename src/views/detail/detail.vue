<template>
  <div class="detail">
      <detail-nav-bar/>
      <detali-swiper :topImages="topImages"/>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar"

  import {getDetailDatas} from "network/detail"

  import DetaliSwiper from "./childComps/DetailSwiper"

  export default {
    name: "detail",
    data() {
      return {
        iid: null,
        topImages:[]
      }
    },
    components:{
      DetailNavBar,
      DetaliSwiper
    },
    created() {
      this.iid = this.$route.params.id;
      // 这里请求数据在request.js中
      getDetailDatas(this.iid).then(res=>{
          //1获取顶部的图片轮播数据
        this.topImages=res.data.list[0].topImage;
      })
    }
  }
</script>

<style scoped>

</style>
