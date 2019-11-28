import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    'city': {
      'id': JSON.parse(localStorage.getItem('city')).id || 73,
      'nm': JSON.parse(localStorage.getItem('city')).nm || '郑州'
    },
    'recentCity': [{'id':10,'nm':'上海'},{'id':42,'nm':'西安'},{'id':50,'nm':'杭州'}]
  },
  mutations: {
    changeCity(state,obj){
      state.city = {
        "id":obj.id,
        'nm': obj.nm
      }
      state.recentCity.unshift(obj) 
      localStorage.setItem('city', JSON.stringify({'id':obj.id,'nm':obj.nm}))
      console.log(JSON.parse(localStorage.getItem('city')));
    }
  },
  actions: {

  }
})
