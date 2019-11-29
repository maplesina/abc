<template>
  <div>
    <header class="clearfix">
      <span class="left-row" @click="handleHistory">
        <i class="iconfont">&#xe68f;</i>
      </span>
      <h1>{{this.$route.params.movNm ? this.$route.params.movNm : movNm }}</h1>
    </header>
    <!-- 电影{{this.$route.params.id}}+++++{{this.$route.params.cityid}} -->
    <!-- 电影详情 -->
    <div class="detail box-flex">
      <div class="shadow-bg"></div>
      <div class="poster-bg" :style="{backgroundImage: 'url(' + detailMovie.img +')'}"></div>
      <div class="poster">
        <img :src="detailMovie.img" />
      </div>
      <div class="content flex">
        <div class="title middle line-ellipsis">{{detailMovie.nm}}</div>
        <div class="title-en-name line-ellipsis">{{detailMovie.enm}}</div>
        <div class="line-ellipsis">
          <span class="score" v-if="detailMovie.sc != 0">{{detailMovie.sc}}</span>
          <span class="no-score title-en-name" v-if="detailMovie.sc == 0">暂无评分</span>
        </div>
        <div class="type title-en-name line-ellipsis">
          <span>{{detailMovie.cat}}</span>

          <div class="type-group"></div>
        </div>
        <div class="src title-en-name line-ellipsis">{{detailMovie.src}}/{{detailMovie.dur}}分钟</div>
        <div class="pubDesc title-en-name line-ellipsis">{{detailMovie.pubDesc}}</div>
      </div>
    </div>
    <!-- 播放日期组 -->
    <swiper :options="swiperOption" class="mb-line-b clearfix" v-show="timeLine">
      <swiper-slide
        class="showDay"
        :class="{'chosed': idx == index }"
        v-for="(item,index) in timeLine"
        :key="index"
        :index = "index"
      >{{item.date.slice(5,10)}}</swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { mapState } from "vuex";
var that = null
export default {
  name: "movies",
  data() {
    return {
      idx: 0,
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 15,
        freeMode: true,
        on:{
          click: function(e){
            console.log(e.target.getAttribute('index'))  
            that.idx =  e.target.getAttribute('index')
            // that.idx = index
          },
        },
      },
      movieId: this.$route.params.id,
      cityId: this.$route.params.cityid,
      movNm: localStorage.movNm,
      movieDay:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      // 电影具体信息
      detailMovie: {},
      //  电影详情
      movie: {},
      // 电影播放时间线
      timeLine: []
    };
  },
  computed: {
    ...mapState({
      localCityId: "city"
    })
  },
  methods: {
    changeTime(index){
      this.idx = index
    },
    handleHistory() {
      window.history.go(-1);
    },
    getMoviesDetail() {
      this.$axios
        .get("/api/ajax/detailmovie?movieId=" + this.movieId)
        .then(res => {
          res.data.detailMovie.img = res.data.detailMovie.img.replace(
            "w.h",
            "148.208"
          );
          this.detailMovie = res.data.detailMovie;
        });
    },
    getMoviesName() {
      var data = {
        movieId: this.movieId,
        day: this.movieDay,
        offset: 0,
        limit: 20,
        cityId: this.localCityId.id,
        districtId: -1,
        lineId: -1,
        hallType: -1,
        brandId: -1,
        serviceId: -1,
        areaId: -1,
        stationId: -1,
        item: "",
        updateShowDay: true,
        reqId: 1574937611997
      };
      this.$axios.post("/api/ajax/movie", data).then(res => {
        this.movie = res.data;
        this.timeLine = res.data.showDays.dates;
        console.log(this.movie);
      });
    }
  },
  mounted() {
    that = this
    this.getMoviesName();
    this.getMoviesDetail();
  }
};
</script>
<style lang="stylus" scoped>
.showDay {
  width: 2.3rem;
  text-align: center;
  line-height: 0.86rem;
  color: #666;
}

.chosed {
  border-bottom: 2px solid #f03d37;
  color: #f03d37;
}

.detail {
  height: 3rem;
  padding: 0.4rem 0.3rem;
  position: relative;
}

.shadow-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #333;
  z-index: -1;
}

.poster-bg {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0.4;
  z-index: -1;
  filter: blur(0.2rem);
}

.poster {
  width: 2.2rem;
  height: 3rem;
  float: left;

  img {
    width: 2.2rem;
    height: 3rem;
  }
}

.content {
  float: left;
  margin-left: 0.25rem;
  color: white;

  .title {
    font-size: 0.4rem;
    font-weight: 600;
    margin-top: 0.04rem;
  }

  .title-en-name {
    font-size: 0.24rem;
    opacity: 0.8;
    margin-top: 0.14rem;
  }

  .score {
    color: #ffcc00;
    font-size: 0.36rem;
    font-weight: 700;
    margin-top: 0.22rem;
  }
}

.left-row {
  float: left;
  line-height: 1rem;
  width: 1.05rem;
  font-size: 0.4rem;
  transform: scale(1.5);
  color: #ffffff;
  text-align: center;
}

h1 {
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-weight: normal;
  font-size: 0.36rem;
  color: #fff;
  background: #e54847;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}
</style>