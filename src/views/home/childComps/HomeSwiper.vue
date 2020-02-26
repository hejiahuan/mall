<template>
  <swiper>
    <swiper-item v-for="items in banners" :key="items.link">
      <a :href="items.link"></a>
      <!--@load来监听图片是否加载完-->
        <img :src="items.image" alt="" @load="imgload">
    </swiper-item>
  </swiper>
</template>

<script>

  import {Swiper, SwiperItem} from "components/common/swiper"

  export default {
    name: "HomeSwiper",
    props: {
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
      // 这里有个问题就是会发4次图片加载完成给父组件，我们只需要一个就行了，所以我们设置一个变量
        isLoad:false
      }
    },
    components: {
      SwiperItem,
      Swiper
    },
    methods:{
      imgload(){
        //加载完成后
        if(!this.isLoad){
          //这里有个问题就是会发4次图片加载完成给父组件，我们只需要一个就行了，所以我们设置一个变量isLoad，只要成功我们就设置为true
          //这样就达到发送一次的结果
          this.$emit("swiperImageLoad")
          this.isLoad=true
        }


      }
    }
  }
</script>

<style scoped>

</style>
