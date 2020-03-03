<template>
  <div>
    <nav-bar>
      <div slot="left" @click="backClick"><span class="arrow"></span></div>
      <div slot="center" class="title">
          <div v-for="(item,index) in titles"  class="item" :class="{active:index===currentIndex}"
               @click="titleClick(index)">
               {{item}}
          </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ["商品", "参数", "评论", "推荐"],
        currentIndex:0
      }
    },
    components: {
      NavBar
    },
    methods:{
      titleClick(index){
        this.currentIndex=index;

      },
      backClick(){
        // 或者go(-1)
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .item{
    flex: 4;
  }

  .active{
    color:var(--color-high-text)
  }

  /*画的三角形*/
  .arrow{
    width: 14px;
    height: 14px;

    border-top: 2px solid #aaa;
    border-left: 2px solid #aaa;
    font-weight: 900;
    display:inline-block;
    transform:rotate(-45deg);
    margin-left: 20px;
    margin-top: 10px;
  }
</style>
