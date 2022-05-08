<template>
  <div class="pagination">
    <div>
      <span class="prev-btn" @click="changePagePrev()">Назад</span>
    </div>
    <div class="wrapper">
      <div
        class="pages"
        v-for="page in pages"
        :class="{
          curPage: page === PAGES,
        }"
        :key="page"

        :to="this.$route.params._page"  
        @click="changePage(page)"
      >
        {{ page }}
      </div>
    </div>
    <div class="next-btn">
      <span class="next-btn" @click="changePageNext()">Далее</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  name: "Pagination",
  props: {
    pages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  computed: {
    ...mapGetters(["PAGES", "TOTAL_PAGES"]),
  },
  methods: {
    ...mapMutations(["SET_PAGES", "SET_PREV_PAGES", "SET_NEXT_PAGES"]),
    ...mapActions(["GET_POSTS_FROM_API"]),
    changePage(page) {
      this.SET_PAGES(page);
      this.GET_POSTS_FROM_API();
      this.$route.params.id === page;
    },
    changePagePrev() {
      this.SET_PREV_PAGES();
      this.GET_POSTS_FROM_API();
    },
    changePageNext() {
      this.SET_NEXT_PAGES();
      this.GET_POSTS_FROM_API();
    },
  },

  mounted() {
    // this.GET_POSTS_FROM_API();
  },
};
</script>

<style scoped>
.pagination {
  display: flex;
  margin: 0;
  padding: 0;
  justify-content: space-between;
}
.wrapper {
  margin: auto;
  display: flex;
}
.pages {
  margin: 0 5px;
  font-size: 18px;
  font-style: italic;
  line-height: 25px;
  font-weight: 700;
  color: #474955;
}
.curPage {
  color: #7EBC3C;
}
</style>
