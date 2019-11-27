<template>
  <div class="menu-wrap">
    <ul class="menu">
      <router-link to="/city" tag="li">郑州<i class="iconfont">&#xe634;</i></router-link>
      <router-link to="/hot" tag="li" exact>正在热映</router-link>
      <router-link to="/recoming" tag="li">即将上映</router-link>
      <li><i class="el-icon-search"></i></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'indexRel',
    components: {
    
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
.menu-wrap 
  line-height .88rem
  height .88rem
  ul
    display flex
    border-bottom 1px solid #e6e6e6
    justify-content center
    li
      flex 1
      text-align center
.router-link-exact-active
  color #ef4238
  border-bottom 2px solid #ef4238
</style>