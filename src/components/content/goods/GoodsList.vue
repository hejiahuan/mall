<template>
  <div class="goods">
    <goods-item v-for="item in goods" :goodsItem="item"/>
  </div>
</template>

<script>

  import GoodsItem from "./GoodsListItem"

  export default {
    name: "GoodsList",
    props: {
      goods: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components:{
      GoodsItem
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }
</style>
