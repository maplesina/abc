<template>
  <div>
    <h1 class="title">影院</h1>
		<navbar></navbar>
  </div>
</template>
<script>
import navbar from '@/views/navbar/barfixed'
export default {
	name: 'indexHead',
	components:{
		navbar
	},
  data() {
		return {
				
		}
  },
}
</script>
<style lang="stylus" scoped>
.title
  height 1rem
  line-height 1rem
  text-align center
  font-size .36rem
  color #fff
  background #e54847
  font-weight 400
  font-family Helvetica Neue,Helvetica,Arial,sans-serif
</style>