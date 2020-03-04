<!--这个组件是详情页的基础信息组件-->
<template>
  <div v-if="Object.keys(goods).length !== 0"  class="item">
    <div class="title">
      <p>{{goods.title}}</p>
    </div>
    <div class="price">
      <span class="newPrice">{{goods.newPrice}}</span>
      <span class="oldPirce">{{goods.oldPrice}}</span>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="other">
        <span v-for="item in goods.columns">
          {{item}}
        </span>
    </div>


    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>
    <h5>我是你爸爸</h5>

  </div>

</template>

<script>
  export default {
    name: "DetailBasicInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .item{
    border-bottom: 1px solid rgba(100,100,100,.1);

  }
  .title,.price{
    margin-top: 10px;
  }

  .title p{
    color: black;
    text-indent: 2em;
    font-size: 20px;
    font-weight: 800;
  }

  .price .newPrice{
    color: #ff5777;
    font-size: 30px;
  }
  .price .oldPirce{
    text-decoration:line-through;
  }
  .price .discount{
    margin-left: 4px;
    position: relative;
    bottom: 10px;
    font-size: 14px;
    color: #fff;
    padding: 4px;
    border-radius: 10px;
    background-color: #ff5777;
  }

  .other{

    margin-top: 20px;
    display: flex;
    justify-content: space-around;

    line-height: 40px;


  }
  .other span{
    color: #333;
  }


</style>
