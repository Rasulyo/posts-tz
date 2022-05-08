import axios from 'axios'
import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    posts: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    searchValue: ''
  },
  actions: {
    async GET_POSTS_FROM_API({
      state,
      commit
    }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        });
        commit("SET_TOTAL_PAGES", Math.ceil(response.headers['x-total-count'] / state.limit))
        commit('SET_POSTS_TO_STATE', response.data)
      } catch (error) {
        console.log(error, 'error')
      }
    },
    GET_FILTERED_POSTS({
      commit
    }, value) {
      commit('SET_SEARCH_VALUE', value)
    }
  },
  mutations: {
    SET_POSTS_TO_STATE: (state, response) => {
      state.posts = response
    },
    SET_TOTAL_PAGES: (state, totalPages) => {
      state.totalPages = totalPages
    },
    SET_PAGES: (state, page) => {
      state.page = page
    },
    SET_SEARCH_VALUE: (state, searchValue) => {
      state.searchValue = searchValue
    },
    SET_PREV_PAGES: (state) => {
      if (state.page === 1) {
        return page = 1
      }
      state.page = state.page -= 1
    },
    SET_NEXT_PAGES: (state) => {
      if (state.page === state.totalPages) {
        return state.totalPages
      }
      state.page = state.page += 1
    }
  },
  getters: {
    POSTS(state) {
      return state.posts
    },
    PAGES(state) {
      return state.page
    },
    TOTAL_PAGES(state) {
      let arr = []
      for(let i = 1;i <=state.totalPages; i++ ){
        arr.push(i)
      }
      return arr
    },
    FILTERED(state) {
      return state.posts
    },
    SEARCHED(state, getters) {
      if(state.searchValue){
        let arr = getters.FILTERED
        return arr.filter(item => item.title.includes(state.searchValue))
      }else{
        let arr = getters.FILTERED
        return arr
      }
    },
    searchVal(state) {
      return state.searchValue
    }
  }
})