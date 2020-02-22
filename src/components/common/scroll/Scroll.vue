<!--封装Better-scroll 以达到解耦合的标准-->

<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>


</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    components: {
      BScroll
    },
    mounted() {
      //1创建BScroll对象
      //ref可以明确拿出你想要的东西
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        //为什么这么写，那是因为事实监听很影响性能！！！！不是所有功能都需要实时监听
        probeType: this.probeType
      })

      //2监听滚动的位置
      this.scroll.on("scroll",(position)=>{
        //谁需要要位置我们把位置传给Home父组件
        this.$emit("scroll",position)
      })


    },
    methods: {
      //自己封装了一个scrollTo方法，其实用这个  this.$refs.scroll.scroll.scrollTo(0,0,500)就可以
      scrollTo(x, y, time = 300) {
        this.scroll.scrollTo(x, y, time);
      }
    }
  }
</script>

<style scoped>

</style>
