<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left">左边</div>
      <div slot="center">购物街</div>
      <div slot="right">右边</div>
    </nav-bar>
    <tab-control :titles="titles" class="tabControlTop" @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"/>

    <!--把除了上边的home-nav其他都加入scroll中，这些就可以局部滚动了-->

    <!--用ref把组件加入$refs中，这样就可以拿到scroll组件对象了！！！-->
    <!--probe-type为啥是3那是因为我们传个3，不是所有功能需要实时监听，不传就是不监听-->
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true"
            @pullingUp="loadMore">
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!--做下面的推荐--->
      <home-recommends :recommends="recommends"/>
      <!--本周流行-->
      <home-popular/>
      <!--Tab Control-->
      <!--简单用css属性做一个栏目吸顶position: sticky;-->
      <!--tabControl在内部点击，然后将内部点击事件传入外部home-->
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2"/>

      <!--商品数据展示-->
      <!--觉得goods[currentType]太长了计算属性一下-->
      <!--<good-list :goods="goods[currentType].list"/>-->
      <!--商品数据展示-->
      <good-list :goods="showGoods"/>
    </Scroll>

    <!--不用放到Scroll,不需要跟他滚,组件是不能直接监听点击的，必须加native才可以-->
    <back-top @click.native="backClick" v-show="isShow"/>


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

  //导入防抖函数
  import {debounce} from "components/common/utils"

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
        currentType: "pop",
        isShow: false,
        //获取tabControl的
        tabOffsetTop:0,
        //做吸顶用的
        isTabFixed:false,
        saveY:0,
        ItemImgListener:null
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



    },
    mounted() {

      //监听从goodsListItem.vue中发送的事件！！！！用于修改scroll下拉加载的bug
      //默认情况下$bus是没有的！！！是空的，
      //我们需要在main.js中Vue.prototype.$bus=new Vue()就可以

      //防抖动函数
      const refresh = debounce(this.$refs.scroll.refresh, 500)


      //对监听的事件进行保存,为了做取消事件总线
      this.ItemImgListener=() => {

        refresh()

      }

      this.$bus.$on("itemImageLoad", this.ItemImgListener)



    },

    destroyed(){
      console.log("home摧毁了");
    },
    // 活跃的时候
    activated(){
      //注意这里的y值是负数不是正数！！！！
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()
      console.log("进入页面");
    },
    // 离开的时候
    deactivated(){
      this.saveY=this.$refs.scroll.getScrollY()

      //取消全局事件的监听
      this.$bus.$off("itemImgLoad",this.ItemImgListener)

      console.log("离开页面");
    },



    methods: {
      // 不能再create()拿tabControl
      //拿到tabControl对象
      //所有的组件都有一个属性$el,Vue 实例使用的根 DOM 元素。
      //但是我们这个offsettop如果上边的图片没有加载完，他的offsetTop是有变化的！！！所以我们思路是
      //监听轮播图是否加载完，然后在计算offsetTop
   // 监听图片是否加载完成并且得到正确的offsetTop
      swiperImageLoad(){
        this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      },


      // 封装一个防抖函数
      // 原理就是定时器
      //过程:
      // 如果直接执行Refresh,refresh函数会执行10次，因为一页显示10个
      // 可以将refresh函数传入到debounce函数中，生成一个新的函数
      //这里的func= this.$refs.scroll.refresh注意这里refresh是传入一个函数不带括号！！！！带括号等于把结果值传入了
      // const refresh=debounce(this.$refs.scroll.refresh,500)
      // refresh()====>相当于执行了return function(...args)函数

      // 这里把防抖函数封装到util.js中
      // debounce(func, delay) {
      //   let timer = null
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       //执行
      //       func.apply(this, args)
      //     }, delay)
      //
      //   }
      // }
      //,

      //下拉加载更多,这种方式是有bug的
      loadMore() {
        this.GetGoodsData(this.currentType)
      },


      //回到首页！！！！
      backClick() {
        //用ref加入scroll组件对象！！
        // this.$refs.scroll.scroll.scrollTo(0,0,500)
        //下面这个只是做了封装！！！
        this.$refs.scroll.scrollTo(0, 0)
      },

      //监听位置postition,这个方法为了做topBack的隐藏和消失
      // 因为你要什么时候隐藏和消失，必须得知道位置
      contentScroll(postion) {
        // 这个是有scroll传入给home父组件的
        //如果postion大于1000，显示出来topBack
        this.isShow = (-postion.y) > 1000
        // 2TabControl是否吸顶,大于就应该吸顶，然后动态绑定class
        this.isTabFixed=(-postion.y)>this.tabOffsetTop

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

        //让2个tanControll保持一致！！不然Current不一致了
        this.$refs.tabControl1.currentIndex=index;
        this.$refs.tabControl2.currentIndex=index;
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


          //这里一定要注意加载一次后一定要关闭加载更多不然加载一次再加载加载不了了
          this.$refs.scroll.finishPullUp()


        })
      }
    }
  }
</script>

<style scoped>
  /*解决在better-scroll里边吸顶有问题的方法，就是把Tabcontrol从better-scroll再拿出来一个*/

  .tabControlTop{
    /*用相对定位他还会保持原来的位置*/
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  #home {
    /*//viewport height ---->当前视口高度*/
    /*当前视口高度100%*/
    height: 100vh;

    position: relative;
  }
  /*在用better-scroll中，顶部要fixed导航的导航栏可以不用设置fixed属性，他自动fixed.*/
  /*我们取消了homenav的fixed布局，照样适用fixed*/
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*固定上班购物街*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
    /*//固定上班购物街*/
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
  }

  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/
  .fixed{
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;

  }
</style>
