<template>
  <div>
    <index-head></index-head>
    <index-rel></index-rel>
    <transition name="fade" mode="in-out">
      <router-view/>
    </transition>
    <navbar></navbar> 
  </div>
</template>
<script>
import indexHead from './components/head.vue'
import indexRel from '@/views/home/components/rel'
import navbar from '@/views/navbar/barfixed'
export default {
  components: {
    indexHead,
    indexRel,
    navbar
  }
}
</script>
<style lang="stylus" scoped>
.fade-enter,.fade-leave
  opacity 0
.fade-enter-active,.fade-leave-active
  transition all .2s
.fade-enter-to
  opacity 1
</style>
