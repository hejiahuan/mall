<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item"
         :class="{active:index===currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabController",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      //点击事件
      itemClick(index) {
        this.currentIndex = index;
        //这里做子传父，做的是TabControl切换并且改变数据,传给父组件home
        this.$emit("tabClick",index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);

  }
</style>
