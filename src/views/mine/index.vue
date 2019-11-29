<template>
  <div class="bg">
    <header class="clearfix">
      <span class="left-row" @click="handleHistory"><i class="iconfont">&#xe68f;</i></span>
      <h1> 猫咪影视</h1>
    </header>
    <div class="tab clearfix">
      <div class="tab-inner" :class="{active:num == 0}" @click="tab(0)">美团帐号登录</div>
      <div class="tab-inner" :class="{active:num == 1}" @click="tab(1)">手机验证登录</div>
    </div>
    <div class="tab-item">
      <div class="tab-mtuan" v-show="num == 0">
        <el-input v-model="input" placeholder="账户名/手机号/Email"></el-input>
        <el-input v-model="pwd" placeholder="请输入密码" show-password></el-input>
        <el-row>
          <el-button type="danger">登录</el-button>
        </el-row>
      </div>
      <div class="tab-phone" v-show="num == 1">
        <div>
          <el-input placeholder="请输入手机号">
            <template slot="append">获取验证码</template>
          </el-input>
          <el-input  placeholder="请输入短信验证码"></el-input>
          <el-row>
            <el-button type="info" disabled>登录</el-button>
          </el-row>
        </div>
      </div>
    </div>
		<!-- <navbar></navbar> -->
  </div>
</template>
<script>
// import navbar from '@/views/navbar/barfixed'
export default {
	name: 'indexHead',
	// components:{
	// 	navbar
	// },
  data() {
		return {
      input: '',
      pwd: '',
      num: 0
		}
  },
  methods:{
    tab(index) {
      this.num = index
    },
    handleHistory(){
      window.history.go(-1)
    }
  }
}
</script>
<style lang="stylus" scoped>
.active 
  border-bottom: .08rem solid #FFC300;
.bg
  background-color #f8f8f8
.tab
  line-height .72rem
  text-align center
  padding 0 .3rem
  .tab-inner
    width 50%
    float left
    color #222222
    font-size .25rem
.el-row
  margin-top .1rem
  height 0.6rem
  line-height .6rem
.el-button
  width 100%
.el-input
  margin-top .1rem
.tab-item
  padding 0 .2rem
header 
  background-color: #df2d2d;
.left-row
  float left
  line-height 1rem
  width 1.05rem
  font-size .4rem
  transform scale(1.5)
  color #ffffff
  text-align center
h1
  height 1rem
  line-height 1rem
  text-align center
  font-weight normal
  font-size .36rem
  color #fff
  background #e54847
  font-family Helvetica Neue,Helvetica,Arial,sans-serif
</style>