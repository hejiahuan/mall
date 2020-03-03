<template>
  <div class="detail">
      <detail-nav-bar/>
  </div>
</template>

<script>

  import DetailNavBar from "./childComps/DetailNavBar"

  export default {
    name: "detail",
    data() {
      return {
        iid: null
      }
    },
    components:{
      DetailNavBar
    },
    created() {
      this.iid = this.$route.params.id;
    }
  }
</script>

<style scoped>

</style>
