import Vue from 'vue'
import Router from 'vue-router'
import city from '@/components/city' //城市组件
import index from './views/home/index' //首页组件
import coming from './views/recent/recent.vue' //首页近期上映组件
import indexList from './views/home/components/indexList.vue' //首页正在热映组件
import cinemaIndex from './views/cinema/index' //影院组件
import mineIndex from './views/mine/index' //影院组件

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // linkActiveClass: 'active', //链接激活时设置的类名
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: "hot",
          component: indexList
        },
        {
          path: "recoming",
          component: coming
        }
      ],
      redirect: '/hot' || '/recoming'
    },
    {
      path: '/city',
      name: 'city',
      component: city
    },
    {
      path: '/cinema',
      name: 'cinema',
      component: cinemaIndex
    },
    {
      path: '/mine',
      name: 'mine',
      component: mineIndex
    }
  ]
})
