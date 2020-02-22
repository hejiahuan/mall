<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left">左边</div>
      <div slot="center">购物街</div>
      <div slot="right">右边</div>
    </nav-bar>

    <!--把除了上边的home-nav其他都加入scroll中，这些就可以局部滚动了-->

    <!--用ref把组件加入$refs中，这样就可以拿到scroll组件对象了！！！-->
    <Scroll class="content" ref="scroll">
      <!--轮播图-->
      <home-swiper :banners="banners"></home-swiper>
      <!--做下面的推荐--->
      <home-recommends :recommends="recommends"/>
      <!--本周流行-->
      <home-popular/>
      <!--Tab Control-->
      <!--简单用css属性做一个栏目吸顶position: sticky;-->
      <!--tabControl在内部点击，然后将内部点击事件传入外部home-->
      <tab-control :titles="titles" class="tab-control" @tabClick="tabClick"/>

      <!--商品数据展示-->
      <!--觉得goods[currentType]太长了计算属性一下-->
      <!--<good-list :goods="goods[currentType].list"/>-->
      <!--商品数据展示-->
      <good-list :goods="showGoods"/>
    </Scroll>

    <!--不用放到Scroll,不需要跟他滚,组件是不能直接监听点击的，必须加native才可以-->
    <back-top  @click.native="backClick"/>


  </div>
</template>

<script>

  import NavBar from "components/common/navbar/NavBar"
  import HomeSwiper from './childComps/HomeSwiper'

  import {GetHomeData} from "network/home.js"
  import {GetGoodsData} from "network/home.js"
  import {Test} from "network/home.js"

  // 推荐
  import HomeRecommends from './childComps/HomeRecommends'
  //本周流行，其实是一张图片，偷懒了，应该写个6个div
  import HomePopular from "./childComps/HomePopular"

  //TabControl
  import TabControl from "components/common/tabcontrol/TabControl"

  //商品数据展示
  import GoodList from "components/content/goods/GoodsList.vue"

  //引入封装的scroll组件以达到解耦合
  import Scroll from "components/common/scroll/Scroll"

  //回到首页
  import BackTop from "components/common/backtop/BackTop"

  export default {
    name: "Home",
    data() {
      return {
        banners: [],
        recommends: [],
        titles: ["流行", "新闻", "特卖"],
        goods: {
          "pop": {page: 0, list: []},
          "news": {page: 0, list: []},
          "sells": {page: 0, list: []}

        },
        currentType: "pop"
      }

    },
    computed: {
      //觉得goods[currentType].list太长了用计算属性做一下
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      BackTop,
      NavBar,
      HomeSwiper,
      HomeRecommends,
      HomePopular,
      TabControl,
      GoodList,
      Scroll
    },
    created() {
      this.GetHomeData()

      //请求tab 下商品的数据
      this.GetGoodsData("pop");
      this.GetGoodsData("news");
      this.GetGoodsData("sells");


    }
    , methods: {
      //回到首页！！！！
      backClick(){
          //用ref加入scroll组件对象！！
       // this.$refs.scroll.scroll.scrollTo(0,0,500)
        //下面这个只是做了封装！！！
        this.$refs.scroll.scrollTo(0,0)
      },


      /***
       * 事件监听的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = "pop"
            break
          case 1:
            this.currentType = "news"
            break
          case 2:
            this.currentType = "sells"
            break
        }
      },


      /**
       * 网络请求
       * @constructor
       */
      GetHomeData() {
        GetHomeData().then(res => {
          this.banners = res.data.data.banner.list;
          this.recommends = res.data.data.recommend.list;
        })
      },
      GetGoodsData(type) {
        //初始page=0,为了复用！！！
        //请求goods数据
        const page = this.goods[type].page + 1
        GetGoodsData(type, page).then(res => {
          // 可变参数,语义就是把...后边的数组自己解析，然后放入list中
          this.goods[type].list.push(...res.data.list);
          //然后把page+1
          this.goods[type].page += 1
        })
      }
    }

  }
</script>

<style scoped>
  #home {
    /*//viewport height ---->当前视口高度*/
    /*当前视口高度100%*/
    height: 100vh;

    padding-top: 44px;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;


    /*//固定上班购物街*/
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
    /*//固定上班购物街*/
  }


  .tab-control {
    /*//吸顶属性*/
    /*//必须设置top属性*/
    /*sticky到达top值后，自动position变成flex*/
    position: sticky;
    top: 44px
  }


  /*//这里的content不会影响到scroll中的.content因为有styple=scoped,作用域*/
  .content {
    /*height: 300px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  }
</style>
