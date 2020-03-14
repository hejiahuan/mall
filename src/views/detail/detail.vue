<template>
  <div class="detail">
    <detail-nav-bar class="nav" @titleCLick="titleCLick"/>

    <!--需要滚动的东西加入-->
    <better-scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detali-swiper :topImages="topImages"/>
      <detail-basic-info :goods="goods"/>
      <detail-param-info ref="detailParams"/>
      <detail-comment ref="detailComment" @ImageLoad="ImageLoad"/>
      <goods-list :goods="recommend" ref="goodsList"/>
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

  //引入规格参数
  import DetailParamInfo from "views/detail/childComps/DetailParamInfo"

  //引入评论
  import DetailComment from "views/detail/childComps/DetailComment"


  //导入防抖函数
  import {debounce} from "components/common/utils"


  //导入混入解决复用的封装
  import {ItemListenMixins} from "components/common/mixins"

  export default {
    name: "detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        recommend: [],
        //这里用mixins来定义这个对象
        // ItemImgListener:null
        themeTopYs: [],
        //做防抖函数用
        getThemeTopY: null
      }
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
          this.recommend = res.data.list
        })
      })

      // 4做防抖函数给getTopy赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0),
          this.themeTopYs.push(this.$refs.detailParams.$el.offsetTop),
          this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop),
          this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop)

      })
    },
    methods: {
      titleCLick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index])
        // 比如第一个是评论，第二个是参数，那么怎么拿到他们的Y值呢，Y=offsetTop值呢，给每个组件那里加ref
        // this.themeTopYs.push(this.$refs.xx.$el.offsetTop)
      },
      // 监听图片加载完成
      ImageLoad() {
        this.$refs.scroll.refresh();

        // 做防抖！！！
        // this.themeTopYs = []
        // this.themeTopYs.push(0),
        //   this.themeTopYs.push(this.$refs.detailParams.$el.offsetTop),
        //   this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop),
        //   this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop)
        // 防抖函数
        // 1在data中设置一个值为null
        // 2在create中设置函数
        // 3调用函数
        this.getThemeTopY();
      },

      // 监听滚动

      contentScroll(position){
        console.log(position);

      }

    },
    components: {
      DetailNavBar,
      DetaliSwiper,
      DetailBasicInfo,
      BetterScroll,
      GoodsList,
      DetailParamInfo,
      DetailComment
    },
    mixins: [ItemListenMixins],


    updated() {
      //update是生命周期函数，只要数据发生变化就会更新，所以这里更新太频繁了！！！！
      //   this.themeTopYs=[],
      //   this.themeTopYs.push(0),
      //   this.themeTopYs.push(this.$refs.detailParams.$el.offsetTop),
      //   this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop),
      //   this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop)
      // console.log(this.themeTopYs)
    },


    //这里用mixins来定义这个对象,请看mixins.js
    mounted() {
      //   //防抖动函数
      //   const newrefresh = debounce(this.$refs.scroll.refresh, 500)
      //   //这里用了第二种方法来监听GoodsListItem图片加载完了，然后发送给Detail让他来刷新
      //   this.ItemImgListener=()=>{
      //     newrefresh()
      //   }
      //
      //   this.$bus.$on("itemImageLoad", this.ItemImgListener)

      // mouted肯定不行,不能获取他们评论，规格的Y值
      //   this.themeTopYs.push(0),
      //   this.themeTopYs.push(this.$refs.detailParams.$el.offsetTop),
      //   this.themeTopYs.push(this.$refs.detailComment.$el.offsetTop),
      //   this.themeTopYs.push(this.$refs.goodsList.$el.offsetTop)
      //   console.log(this.themeTopYs)
    },

    activated() {
      // 没有加keep-alive进入和离开函数都不起作用
      alert("我是你爸爸吧");
    },

    //这里deactivated是用不了的，没有做缓存的话离开他应该是调用的destroyed
    deactivated() {
      // <div id="app">
      //     <keep-alive exclude="detail">
      //     <router-view/>
      //     </keep-alive>
      //     <main-tab-bar/>
      //
      //     </div>
      //   我们detail没有加缓存
      //这里deactivated是用不了的，没有做缓存的话离开他应该是调用的dest
      alert("我是你爸爸吧");
    },
    destroyed() {
      console.log("记住在没有keep-alive的加缓存的页面里，deactivated不存在离开，只能调用destroyed()方法，因为deactivated在keep-alive中是特有的");
      //取消全局事件的监听
      this.$bus.$off("itemImgLoad", this.ItemImgListener)

      console.log("离开页面");
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
