<template>
  <div>
    <img src="~assets/img/detail/comment.png" alt="" @load="ImageLoad">
  </div>

</template>

<script>
  export default {
    name: "DetailComment",
    methods: {
      ImageLoad(){
        this.$emit("ImageLoad")
      }
    }
  }
</script>

<style scoped>
  img {
    width: 500px
  }
</style>
