<!--封装Better-scroll 以达到解耦合的标准-->

<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
      <!--这个是加了一个等待的gif动图不喜欢直接删除loading和import-->
      <Loading v-show="isShow"  class="loading" align="center"/>
      <!--<div v-show="isShow" align="center">加载中...</div>-->
    </div>
  </div>


</template>

<script>
  import BScroll from "better-scroll"

  import Loading from "components/common/loading/loading"

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad:{
        type:Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
        isShow:false

      }
    },
    components: {
      BScroll,
      Loading
    },
    mounted() {
      //1创建BScroll对象
      //ref可以明确拿出你想要的东西
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        //为什么这么写，那是因为事实监听很影响性能！！！！不是所有功能都需要实时监听
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      //2监听滚动的位置
      this.scroll.on("scroll", (position) => {
        //谁需要要位置我们把位置传给Home父组件
        this.$emit("scroll", position)
      })

      //3监听上拉事件！！！！这个也不是每个人都需要上拉加载更多！！！
      this.scroll.on("pullingUp",()=>{
        // alert("上拉加载更多")
        this.isShow=true
         this.$emit("pullingUp")
      })


    },
    methods: {
      //自己封装了一个scrollTo方法，其实用这个  this.$refs.scroll.scroll.scrollTo(0,0,500)就可以
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time);
      },
      //加载完一次必须执行finishPullUp方法不然再加载是加载不数据的
      // 可以配置离（threshold）来决定开始加载的时机。当上拉加载数据加载完毕后，需要执行 finishPullUp 方法
      //这里封装一下这个方法，为了解耦合，也可以直接调用
      finishPullUp(){
        //页面改变一次要刷新一次！！！不然有bug
        this.scroll.refresh()
        //页面加载一次要结束一次，否自只能加载一次
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>
