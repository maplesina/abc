<template>
  <div>
    <h1 class="title">影院</h1>
    <el-row class="local-bg">
      <el-col :span="5" class="localCity">{{localCity.nm}}<i class="iconfont icon-xiajiantoushixinxiao"></i></el-col>
      <el-col :span="19">
        <div class="search-entry search-input" data-type="cinema">
          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAwFJREFUSA3FVs1qU0EUTibBRQiCRF3UB3BTcFHwJ0XRJ+gDhDaQ5vcJ3PgCfYL80AYSyQP4BIKQiosuhLoQXOjCbqQIJUgoyY3fdzNnmCRzk3uvBQfmzrlzzvm+OTNzz7mJxH9qyTC83W733mQyeTKbzbbQc8lk8hL9Ip1OfyqVSr/CYCzbBBKDQHU6nX2MZfQ8HNWyM949LOAU/bharb7F6DlsnFNOYhDmp9NpGx7bTi/35HkqlaphAadu9eLsCjFIS57nNRHlLct0AnmIiL5ivETPQf8Q4y56Gt1v0F8rpRog78pc0LhATFJEemIZXwHoKJvNNguFwm9r3hcHg8Gd0WjUwEJfY+K26BH54SZyQ8ztBcB7K9IzAO01Go2fAhg0NpvNB9C9Q9+hjY781bpt9y8MyBTP1CZFpC/CkJKIdrSHyMUmiKPxXBeSJvOb2mq1DiDLRbqCvFer1f7QIGzT9nuwpz/bNnZxfy6uPv0VYWvKouKZho1UfGTUkR/JOyI3uDIno2JygMEzPTHhRRJlnFH78yvglueJ78JRzEhQyFkMXbfX5Rg0p/2HWi/4K+YKq9qSWf2dymvs0cax8W1AEuesCSaHm2gGZwnfYCuszhhh1l6EMYohGJwlfANF4gt5w+qYBv+52Tg2vg2sWNowIVVll2nQNogqa3/mcDZP48/frKdiPcWqpKKkmXstfWRR+/uFg7hB9VpSpikMTPg690YmpR/834gjiI9FXh79IoEzUUibn6GUtHnG3Bslbbbb7QxIfwDjriY5r9frj0Aux7jALSnTYxGH0bXW7gDkQ9jIdaRfLFLCfEefUXA1UxapvKl6bBF1EXUZAa0sYIFYyBFt7D8QHBu/kuebyFeINXnsf65KpfIR94WXqrSO3ElMB33hDrBNh5DX/mVCf4It7ctFwntyE3kgsbXaRL/fvz8ejx8DMPR/9SbyUMT2IqLIa8mjAMWxdZB/y2QyT80/cRzQMD78lNDKOHOa84fwZbFYtCtiGJj4Noy81+uZcvkXH+aXwmK6+EsAAAAASUVORK5CYII=">
          <span>搜影院</span>
        </div>
      </el-col>
    </el-row>
		<navbar></navbar>
  </div>
</template>
<script>
import navbar from '@/views/navbar/barfixed'
import { mapState } from 'vuex'
export default {
	name: 'indexHead',
	components:{
		navbar
  },
  computed:{
    ...mapState({
      localCity: 'city'
    })
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
.local-bg
  background-color #f5f5f5
.localCity
  text-align center
  line-height .88rem
  font-size .3rem
  color #666
.search-entry
  background-color #fff
  height: .56rem;
  font-size: .26rem;
  color: #b2b2b2;
  margin .15rem .3rem
  border: .5px solid #e6e6e6;
  border-radius: 5px;
  margin-right: 15px;
  text-align center
  img 
    width 0.28rem
    height 0.28rem
    margin  0 .08rem
    vertical-align middle
  span 
    font-size: .26rem;
    line-height .56rem
    color: #b2b2b2;
</style>