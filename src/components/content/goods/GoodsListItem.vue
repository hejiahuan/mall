<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.image" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsListItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {};
        }

      }
    },
    methods:{
      imgLoad(){
        console.log("图片加载完成");
        //如何拿到scroll对象，用事件总线$bus
        // 1用父子组件通信可以拿到
        // 2用vuex方式可以拿到
        // 3用事件总线$bus
        //发射一个事件！！！，然后在Home.vue中监听
          this.$bus.$emit("itemImageLoad")
      },

      itemClick(){
        //路由的跳转,这块用的是动态路由跳转没有用query跳转
        this.$router.push("/detail/"+this.goodsItem.id)
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
