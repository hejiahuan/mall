<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left">左边</div>
      <div slot="center">购物街</div>
      <div slot="right">右边</div>
    </nav-bar>

    <!--轮播图-->
    <home-swiper :banners="banners"></home-swiper>
    <!--做下面的推荐--->
      <home-recommends :recommends="recommends"/>
    <!--本周流行-->
    <home-popular/>

  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from './childComps/HomeSwiper'

  import {GetHomeData} from "network/home.js"

  // 推荐
  import  HomeRecommends from './childComps/HomeRecommends'
  //本周流行，其实是一张图片，偷懒了，应该写个6个div
  import  HomePopular from "./childComps/HomePopular"

  export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommends:[]
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommends,
      HomePopular
    },
    created() {
      GetHomeData().then(res=>{
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      })
    }

  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
