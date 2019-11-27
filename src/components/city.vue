<template>
	<div class="wrap">
		<el-row>
      <el-col :span="24" class="pos">定位城市</el-col>
    </el-row>
    <div class="inner-content clearfix">
      <div class="inner-item local-city">定位失败，请点击重试</div>
    </div>
    <el-row>
      <el-col :span="24" class="pos">最近访问城市</el-col>
    </el-row>
    <div class="inner-content clearfix">
      <div class="inner-item">郑州</div>
      <div class="inner-item">广州</div>
      <div class="inner-item">杭州</div>
    </div>
    <el-row>
      <el-col :span="24" class="pos">热门城市</el-col>
    </el-row>
    <div class="inner-content clearfix">
      <div class="inner-item">郑州</div>
      <div class="inner-item">广州</div>
      <div class="inner-item">杭州</div>
      <div class="inner-item">郑州</div>
      <div class="inner-item">广州</div>
      <div class="inner-item">杭州</div>
      <div class="inner-item">郑州</div>
      <div class="inner-item">广州</div>
      <div class="inner-item">杭州</div>
      <div class="inner-item">郑州</div>
    </div>
    <div class="sort-city" v-for="(item,index) in sort" :key="index">
      <div class="pos sort">{{item}}</div>
      <div class="sort-item">
        <div class="city-list">阿拉善盟</div>
        <div class="city-list">阿拉善盟</div>
        <div class="city-list">阿拉善盟</div>
      </div>
    </div>
	</div>
</template>
<script>
export default {
  name: 'city',
  data() {
    return {
      cityList: [],
      sort: ['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z']
    }
  },
  methods: {
    getCityData: function () {
      this.$axios.get('mock/city.json').then( res => {
        this.cityList= res.data.data
      })
    }
  },
  mounted() {
    this.getCityData()
  }
}
</script>
<style lang="stylus" scoped>
.wrap
  background #EBEBEB
  color #333
  position absolute
  top 0
  bottom 0
  left 0
  right 0
  .pos
    padding 0 .3rem
    line-height .6rem
  .inner-content
    padding 0 .6rem .2rem .4rem
    background #f5f5f5
    .inner-item
      padding 0 .4rem
      border: 1px solid #e6e6e6;
      background-color #fff
      text-align center
      line-height .66rem
      border-radius .06rem
      margin-top .2rem
      float left
      margin-right 4%
      min-width 16%
    .local-city
      min-width 29%
.sort-city
  background-color #F5F5F5
.sort-item
  padding 0 .6rem 0 .4rem
.sort
  background-color #ebebeb
.city-list
  line-height .88rem
  border-bottom .02rem solid #c8c8cc
</style>