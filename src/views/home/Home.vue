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
    <!--Tab Control-->
    <!--简单用css属性做一个栏目吸顶position: sticky;-->
      <tab-control :titles="titles" class="tab-control"/>
    <div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>
    <div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div><div>哈哈哈哈哈哈</div>







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

  //TabControl
  import TabControl from "components/common/tabcontrol/TabControl"

  export default {
    name: "Home",
    data(){
      return{
        banners:[],
        recommends:[],
        titles:["哈哈哈","ddddd","dddafafasdfads"]
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommends,
      HomePopular,
      TabControl
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
  #home{
      padding-top:44px ;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;


    /*//固定上班购物街*/
    position:  fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    /*//固定上班购物街*/
  }


  .tab-control{
    /*//吸顶属性*/
    /*//必须设置top属性*/
    /*sticky到达top值后，自动position变成flex*/
    position: sticky;
    top:44px
  }
</style>
