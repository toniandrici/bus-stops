import { createStore } from 'vuex'
import axios from 'axios';
import { buildTree } from '@/utils/utils';

type dataType = {
  line: number;
  order:number;
  stop: string;
  time:TimeRanges;
};

type Time = {
  time: string;
  };
  type Stop = {
    stop: string;
    children?: Time[];
    };
type Line = {
  line: number;
  children?: Stop[];
  };
  


export default createStore({
  state: {
    data: [],
    selectedBusLines: [],
    selectedTimes: [],
    busStops: []
  },
  getters: {
    getData(state) {
      return state.data
    },
    getBusLine(state) {
      return state.selectedBusLines
    },
    getTimes(state) {
      return state.selectedTimes
    },
    getBusStops(state) {
      return state.busStops
    },
  },
  mutations: {
    setData(state, item) {
      state.data = item;
    },
    setBusLine(state, item) {
      state.selectedBusLines = item;
    },
    setTimes(state, item) {
      state.selectedTimes = item;
    },
    setBusStops(state, item) {
      state.busStops = item;
    }
  },
  actions: {
    async fetchData({ commit }) { 
       axios.get('http://localhost:3000/stops')
      .then(async (response) => {
          const data: dataType[] = response.data;
          const {tree, stops}  = buildTree(data);
          await commit('setData', tree);
          await commit ('setBusStops', stops);

        })
        .catch(() => {
          console.log('Error');
        });
    },
    async  displaySelectedBus({ commit, dispatch, state }, index) {
      await commit('setBusLine', []);
      await commit ('setTimes', []);
      if(index || index === 0) {
        const data: Line = state.data[index] as Line;
          commit('setBusLine', data);
      }
    },
    async displaySelectedTimes({ commit }, dt) {
      await commit ('setTimes', dt);
    },
    }
});
