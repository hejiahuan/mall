<template>
  <swiper>
    <swiper-item v-for="items in banners" :key="items.link">
      <a :href="items.link"></a>
        <img :src="items.image" alt="">
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
    components: {
      SwiperItem,
      Swiper
    }
  }
</script>

<style scoped>

</style>
