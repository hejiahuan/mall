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
    data(){
      return{
        scroll:null
      }
    },
    components:{
      BScroll
    },
    mounted() {
      //ref可以明确拿出你想要的东西
        this.scroll=new BScroll(this.$refs.wrapper,{

        })
    }
  }
</script>

<style scoped>

</style>
