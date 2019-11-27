<template>
  <div class="page-wrap" ref="pageWrap">
    <div>
      <div class="coming-list">
        <p class="title">近期最受期待</p>
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in swiperList" :key="index" :movieId="item.id">
            <img class="swiper-img" :src="item.img" alt="">
            <p class="like-person">{{item.wish}}想看</p>
            <p class="name ellp">{{item.nm}}</p>
            <p class="date">{{item.comingTitle}}</p>
          </swiper-slide>
        </swiper>
      </div>
      <div class="group-list">
        <div v-for="item in coming" :key="item.id">
          <el-row>
            <el-col :span="24" class="group-date">{{item.comingTitle}}</el-col>
          </el-row>
          <el-row :id="item.id">
            <el-col :span="5">
              <img class="group-img" :src=item.img alt="" srcset="">
            </el-col>
            <el-col :span="19" class="content-wrapper">
              <div class="column content">
                <div class="movie-title">
                  <div class="title line-ellipsis ">{{item.nm}}</div>
                </div>
                <div class="detail column">
                  <div class="wantsee line-ellipsis">
                    <span class="person">{{item.wish}}</span>
                    <span class="p-suffix">人想看</span>
                  </div>
                  <div class="actor line-ellipsis ellp" v-if="item.star">主演: {{item.star}}</div>
                  <div class="actor line-ellipsis">{{item.showInfo}}</div>
                  <el-button  class="btn pre" type="primary">预售</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
  name: 'reComing',
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 15,
        freeMode: true
      },
      swiperList: [],
      coming: [],
			moviesIds: [],
      count: 0,
      limit:0
    }
  },
  methods: {
    getSwiperList: function () {
      this.$axios.get('/api/ajax/mostExpected?ci=73&limit=10&offset=0&token=').then( res => {
        console.log(res.data.coming)
        for (var i = 0; i< res.data.coming.length; i++) {
          res.data.coming[i].img = res.data.coming[i].img.replace("w.h","170.230")
          if (res.data.coming[i].comingTitle.match('年')) {
            res.data.coming[i].comingTitle = res.data.coming[i].comingTitle.slice(0,10)
          }else{
            res.data.coming[i].comingTitle = res.data.coming[i].comingTitle.slice(0,6)
          }
        }
        this.swiperList = res.data.coming
      } ).catch()
    },
    getComingList: function () {
      this.$axios.get('/api/ajax/comingList?ci=73&token=&limit=10').then( res => {
        console.log(res.data)
        this.moviesIds = res.data.movieIds
        for (var i = 0; i< res.data.coming.length; i++) {
          res.data.coming[i].img = res.data.coming[i].img.replace("w.h","128.180")
        }
        this.coming = res.data.coming
        this.limit = Math.ceil((this.moviesIds.length - this.coming.length) / 9) //请求次数 2
      } ).catch( err => {console.log(err)} )
		},
		
		getMoreComing: function () {
			this.count ++
			// const yushu = this.moviesIds.length % 10
			this.$axios.get('/api/ajax/moreComingList?ci=73&token=&limit=10&movieIds=' + this.moviesIds.slice(this.coming.length,this.coming.length+10)).then( res => {
        console.log(res.data)
        for (var i = 0; i< res.data.coming.length; i++) {
          res.data.coming[i].img = res.data.coming[i].img.replace("w.h","128.180")
        }
				this.coming = this.coming.concat(res.data.coming)				
      } ).catch( err => {console.log(err)} )
		}
  },
  mounted() {
    this.getSwiperList()
		this.getComingList()
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.pageWrap, {
        click: true,
        pullUpLoad: {
          threshold: -50
        }
      })
      this.scroll.on('pullingUp', () => {
        // 上拉动作
        if (this.count<this.limit) {
          this.getMoreComing()
        }
        this.$nextTick(() => {
          this.scroll.refresh() // DOM 结构发生变化后，重新初始化BScroll
        })
        this.scroll.finishPullUp()
      })
	  })
	}
}
</script>
<style lang="stylus" scoped>
  @import '../../../assets/css/public'
  .group-list
    padding-left .3rem
    background-color #fff
    .group-date
      padding .24rem 0rem
.group-img
  width 1.28rem
  height 90px
.page-wrap
  position absolute
  background-color #F5F5F5
  width 100%
  height 100%
  // top 97px
  overflow auto
.coming-list
  height 192px
  padding 12px 15px
  margin-bottom 10px
//  background-color #666
  .title
    font-size: .28rem;
    color: #333;
    // font-weight: 700;
    margin-bottom: .14rem;
  .detail
    font-size .26rem
    color #666
    position relative
    .actor
      width 4.3rem
      line-height .3rem
      margin-top .1rem
    .pre 
      position absolute
      right .4rem
      top 10px
      width 0.94rem
      padding 0
      height 0.54rem
      font-size .24rem
      span
        text-align center
    .person
      color: #faaf00;
      font-size: .3rem;
      font-weight: 600;
  .swiper-img
    width 85px
    height 115px
  .like-person
    position: absolute;
    left: 0px;
    top: 92px;
    width 82px
    text-align center
    color: #faaf00;
    font-size: 11px;
    font-weight: 600;
  .name
    font-size: 13px;
    color: #222;
    margin-bottom: 3px;
  .date
    font-size: 11px;
    letter-spacing -.5px
    color: #999;
</style>