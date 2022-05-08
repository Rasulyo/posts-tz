<template>
  <div class="hello">
    <div class="input-block">
      <input
        type="text"
        placeholder="Поиск"
        v-model="searchVal"
        @update:model-value="SET_SEARCH_VALUE"
      />
      <img src="../assets/se.png" alt="search-icon" class="icon-search" />
    </div>
    <Page />
  </div>
</template>

<script>
import Pagination from "./Pagination";
import { mapActions, mapGetters, mapMutations } from "vuex";
import Page from "./Page.vue";

export default {
  components: {
    Pagination,
    Page
},
  name: "Table",
  props: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters(["POSTS", "PAGES", "TOTAL_PAGES", "SEARCHED", "searchVal"]),
    getTotalPages() {
      return this.TOTAL_PAGES;
    },
  },
  methods: {
    ...mapActions(["GET_POSTS_FROM_API","GET_FILTERED_POSTS"]),
    ...mapMutations([
      "SET_POSTS_TO_STATE",
      "SET_TOTAL_PAGES",
      "SET_SEARCH_VALUE",
    ]),
  },
  watch: {},
  mounted() {
    this.GET_POSTS_FROM_API();
    this.SET_POSTS_TO_STATE();
    this.SET_TOTAL_PAGES();
    this.GET_FILTERED_POSTS()
  },
};
</script>

<style scoped>
.hello {
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  /* padding: 5%; */
}
.input-block {
  display: flex;
  max-width: 640px;
  position: relative;
}
.input-block > input {
  background-color: #5a5c66;
  width: 100%;
  height: 52px;
  font-size: 14px;
  padding-left: 20px;
  color: #b2b7bf;
  outline: transparent;
  border: none;
  line-height: 19px;
}
.icon-search {
  z-index: 10;
  position: absolute;
  top: 30%;
  left: 90%;
}
</style>
