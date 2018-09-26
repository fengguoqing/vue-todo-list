import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';

Vue.use(Vuex);

// 创建初始应用全局状态
const state = {
  todoList: [],
  menuOpen: false, // 菜单是否开启
};

// 定义所需mutations
const mutations = {
  EDITTODE(state, data) {
    state.todoList = data;
  },
  MENUOPEN(state) {
    state.menuOpen = !state.menuOpen;
  },
};

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
});
