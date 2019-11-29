<template>
  <div>
    <!-- 右侧定位 -->
    <div class="right-nav">
      <p class="nav-list" @click="handleLoca">定位</p>
      <p class="nav-list" @click="handleLoca">最近</p>
      <p class="nav-list" @click="handleLoca">热门</p>
      <div v-for="(item,index) in sort" :key="index">
        <p class="nav-list" v-for="(value,name,index) in item" :key="index" @click="selAlpha">{{name}}</p>
      </div>
    </div>     
    <div class="wrap" ref="wrap">
      <div>
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
          <div class="inner-item" v-for="item in recent" :key="item.id">{{item.nm}}</div>
        </div>
        <el-row>
          <el-col :span="24" class="pos">热门城市</el-col>
        </el-row>
        <div class="inner-content clearfix">
          <div
            class="inner-item"
            v-for="(item,index) in hotCity"
            :key="index"
            @click="changeCity(item.id,item.nm)"
          >{{item.nm}}</div>
        </div>
        <div class="sort-city" v-for="(item,index) in sort" :key="index">
          <div class="pos sort" v-for="(value,name,index) in item" :key="index" :ref="name">{{name}}</div>
          <div class="sort-item">
            <div v-for="list in item" :key="list.id">
              <!-- <div v-for="list in list" :key="list.id">
                {{list.name}}
              </div>-->
              <p
                class="city-list"
                v-for="list in list"
                :key="list.id"
                @click="changeCity(list.id,list.name)"
              >{{list.name}}</p>            
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>
<script>
import { mapState } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "city",
  data() {
    return {
      cityList: [],
      hotCity: [],
      sort: [
        { A: [] },
        { B: [] },
        { C: [] },
        { D: [] },
        { E: [] },
        { F: [] },
        { G: [] },
        { H: [] },
        { J: [] },
        { K: [] },
        { L: [] },
        { M: [] },
        { N: [] },
        { P: [] },
        { Q: [] },
        { R: [] },
        { S: [] },
        { T: [] },
        { W: [] },
        { X: [] },
        { Y: [] },
        { Z: [] }
      ]
    };
  },
  computed: {
    ...mapState({
      recentCity: "recentCity"
    }),
    recent() {
      return this.recentCity.slice(0, 3);
    }
  },
  methods: {
    handleLoca(){
      console.log(this.scroll)
      this.scroll.scrollTo(0,0)
    },
    selAlpha(e){
      //console.log(e.target.innerText);
      const ele = this.$refs[e.target.innerText][0]
      this.scroll.scrollToElement(ele)
    },
    changeCity(id, nm) {
      console.log(id, nm);
      // 路由携参跳转
      this.$router.push({ name: "index", params: { id, nm } });
      // 修改仓库的state状态
      this.$store.commit("changeCity", { id, nm });
    },
    getCityData: function() {
      var that = this;
      this.$axios.get("mock/city.json").then(res => {
        this.cityList = res.data.data;
        this.hotCity = this.cityList.slice(0, 11);
        this.sort.forEach((v, i) => {
          var dex = i;
          for (var key in v) {
            //遍历对象
            // console.log(key)
            key = key.toLowerCase();
            this.cityList.forEach((value) => {
              // console.log(key)
              var arr = that.sort[dex][key.toUpperCase()];
              var letter = value.py;
              if (letter.indexOf(key) == 0) {
                arr.push({ name: value.nm, id: value.id });
              }
            });
          }
        });
      });
    }
  },
  mounted() {
    this.getCityData(),
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrap, {
        click: true
      });      
    });
  }
};
</script>
<style lang="stylus" scoped>
.wrap {
  background: #EBEBEB;
  color: #333;
  position: absolute;
  overflow hidden
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .pos {
    padding: 0 0.3rem;
    line-height: 0.6rem;
  }

  .inner-content {
    padding: 0 0.6rem 0.2rem 0.4rem;
    background: #f5f5f5;

    .inner-item {
      padding: 0 0.4rem;
      border: 1px solid #e6e6e6;
      background-color: #fff;
      text-align: center;
      line-height: 0.66rem;
      border-radius: 0.06rem;
      margin-top: 0.2rem;
      float: left;
      margin-right: 4%;
      min-width: 16%;
    }

    .local-city {
      min-width: 29%;
    }
  }
}

.sort-city {
  background-color: #F5F5F5;
}

.sort-item {
  padding: 0 0.6rem 0 0.4rem;
}

.sort {
  background-color: #ebebeb;
}

.city-list {
  line-height: 0.88rem;
  border-bottom: 0.02rem solid #c8c8cc;
}
.right-nav
  position fixed
  top 10%
  bottom 20%
  right 0
  width .7rem
  text-align center
  color #333
  font-size .24rem
  z-index 999
  .nav-list
    line-height .4rem
</style>