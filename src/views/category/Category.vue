<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈asd哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
      <li>哈哈哈哈哈哈</li>
    </ul>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "Category",
    components: {
      BScroll
    },
    //mounted是模板或者el都渲染完了
    //better-scroll必须放在mounted中，mounted表示模板,el创建完毕了！！不能用create,create那个时候什么都没有创建，找不到better-scroll(dom)中的dom
    //加hidden和不加还是有区别的
    //better-scroll还有底部弹簧效果
    mounted(){
        let bscrollDom = this.$refs.wrapper;
        this.aBScroll = new BScroll(bscrollDom,{
          probeType:3,
          pullUpLoad:true
        })

        this.aBScroll.on("scroll",position=>{
          console.log(position);
        })
      this.aBScroll.on("pullingUp",()=>{
        alert(`上拉加载更多`);
      })
    }
  }
</script>

<style scoped>
  /*必须先做一个局部滚动*/
  .wrapper {
    height: 150px;
    background-color: red;
    overflow: hidden;
    /*!*!*原生的局部滚动*!*!但是手机端非常卡顿*/
    /*overflow-y: scroll;*/
  }
</style>

