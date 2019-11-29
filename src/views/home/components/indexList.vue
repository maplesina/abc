<template>
  <div class="wrap" ref="wrap">
    <div>
      <div v-for="(item,index) in movieList" :key="index" class="container" @click="enterMovies(item.id, item.nm)">
        <img v-lazy="item.img" alt="" class="img-item">
        <div class="colum-content">
          <div class="clearfix">
            <h4 class="title ellp">{{item.nm}}</h4>
            <span class="v-3d">{{item.version}}</span>
            <!-- <span class="v-imax" v-if="iMax">{{iMax}}</span> -->
          </div>
          <p class="p-sc" v-if="item.sc">观众评 <span>{{item.sc}}</span></p>
          <p class="p-sc" v-else><span>{{item.wish}}</span>人想看</p>
          <p class="p-star ellp">主演:{{item.star}}</p>
          <p class="p-info">{{item.showInfo}}</p>
        </div>
        <el-button type="danger" round v-if="item.sc">购票</el-button>
        <el-button type="primary" round v-else>预售</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import { mapState } from 'vuex'
  export default {
    name: 'indexList',
    data() {
      return {
        movieList: [],
        count: 0,
        limit: null,
        moviesID: []
      }
    },
    computed:{
      ...mapState({
        city: 'city'
      })
    },
    methods: {
      // 进入电影详情页
      enterMovies(movId,movNm){
        console.log(movId)
         this.$router.push({ name: "movies",params:{'id':movId, 'cityid': this.city.id, movNm}});
         localStorage.movNm = movNm
      },
      // 根据城市id拿到上映的电影
      getMovies() {
        this.$axios.get('/api/ajax/movieOnInfoList?token=&cityid=' + this.city.id).then((res) => {
        for (var i = 0; i< res.data.movieList.length; i++) {
          res.data.movieList[i].img = res.data.movieList[i].img.replace("w.h","128.180")
          res.data.movieList[i].version = res.data.movieList[i].version.substr(1).toUpperCase()
          // console.log(res.data.movieList[i].version.search("3d imax"));
        }
        this.movieList = res.data.movieList //电影列表
        this.moviesID = res.data.movieIds //今天请求到的相联电影ID
        this.limit = Math.ceil((this.moviesID.length - this.movieList.length) / 9) //请求次数 2
        // this.moviesID = this.moviesID.slice(this.movieList.length)
      })
      },
      getMoreMovies(){
        this.count++
        // if (this.count <= this.limit) {
          const queryList = this.moviesID.slice(this.movieList.length,this.movieList.length+10).join(',')
          console.log(queryList)
          this.$axios.get('/api/ajax/moreComingList?token=&movieIds=' + queryList).then((res) => {
          console.log(res)
          console.log(this.moviesID)
          for (var i = 0; i< res.data.coming.length; i++) {
            res.data.coming[i].img = res.data.coming[i].img.replace("w.h","128.180")
            if (res.data.coming[i].version != '') {
              res.data.coming[i].version = res.data.coming[i].version.substr(1).toUpperCase()
            }else{
              res.data.coming[i].version = ''
            }
             // console.log(res.data.movieList[i].img)
          }
          this.movieList = this.movieList.concat(res.data.coming)
          }) 
        // }
      }
    },
    mounted() {
      this.getMovies()
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.wrap, {
          click: true,
          pullUpLoad: {
            threshold: -30
          }
        })
        this.scroll.on('pullingUp', () => {
          // 上拉动作
          if (this.count<this.limit) {
            this.getMoreMovies()
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
@import '../../../assets/css/public.styl'
.wrap
  padding 12px 15px 12px 15px
  position absolute
  left 0
  right 0
  bottom .96rem
  top 1.9rem
  overflow hidden
.container
  height 2.28rem
  width 100%
  display flex
  justify-content flex-start
  align-items center
.img-item
  width 1.28rem
  height 1.8rem
.colum-content
  width 4.2rem
  margin-left .2rem
  .v-3d
    float left
    font-size .16rem
    color #fff
    line-height .28rem
    margin-top .08rem
    background-color #509FC9
  .v-imax
    float left
    font-size .16rem
    color #509FC9
    margin-left .04rem
    padding 0 .04rem
    background-color #fff
    line-height .28rem
    border 1px solid #509FC9
    border-radius .06rem 
    margin-top .06rem
  .title
    float left
    font-size .34rem
    color #333
    font-weight 700
    width 3.2rem
    margin-bottom .14rem
  .p-sc
    font-size .26rem
    color #666
    margin-bottom .12rem
    span
      font-weight: 700;
      color: #faaf00;
      font-size: .3rem;
  .p-star,.p-info
    color #666
    font-size .26rem
    width 4.1rem
  .p-info
    margin-top .12rem
.el-button--danger
  padding 0
  height .54rem
  line-height .0rem
  width .94rem
  display flex
  justify-content center
  background-color #f03d37
  font-size .24rem
.el-button--primary
  padding 0
  height .54rem
  line-height .0rem
  width .94rem
  display flex
  font-size .24rem
  justify-content center
</style>