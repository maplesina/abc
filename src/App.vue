<template>
  <div id="app">
    <router-view></router-view>
    <!-- <keep-alive> -->
      <!-- <my-head></my-head>
      <index-rel></index-rel>
      <router-view></router-view>
      <navbar></navbar> -->
    <!-- </keep-alive> -->
  </div>
</template>
<script>
  // import index from '@/views/home/index'
  import myHead from '@/views/home/components/head'
  import indexRel from '@/views/home/components/rel'
  import navbar from '@/views/navbar/barfixed'
  export default {
    name: 'App',
    components: {
      // index,
      myHead,
      indexRel,
      navbar
    },
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>
<style lang="stylus">

</style>