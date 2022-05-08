<template>
  <div class="hello">
    <table>
      <tr class="tr-head">
        <th class="th-id">
          ID
          <img
            :class="{
              active: isSortedByAlpha,
            }"
            @click="sortPosts"
            src="../assets/ar.png"
            alt=""
          />
        </th>
        <th class="th-h">
          Загаловок
          <img
            :class="{
              activeTitle: isSortedByTitle,
            }"
            @click="sortPostsTitle"
            src="../assets/ar.png"
            alt=""
          />
        </th>
        <th class="th-d">
          Описание
          <img
            :class="{
              activeDesc: isSortedByDesc,
            }"
            @click="sortPostsDesc"
            src="../assets/ar.png"
            alt=""
          />
        </th>
      </tr>
      <tr class="tr" v-for="item in dataBase" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.body }}</td>
      </tr>
    </table>
    <Pagination :pages="getTotalPages" />
  </div>
</template>

<script>
import Pagination from "./Pagination";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  components: {
    Pagination,
  },
  name: "Page",
  props: {},
  data() {
    return {
      isSortedByAlpha: false,
      isSortedByTitle: false,
      isSortedByDesc: false,
    };
  },
  computed: {
    ...mapGetters(["POSTS", "PAGES", "TOTAL_PAGES", "SEARCHED", "searchVal"]),
    getTotalPages() {
      return this.TOTAL_PAGES;
    },
    dataBase(){
      return this.SEARCHED
    }
  },
  methods: {
    ...mapActions(["GET_POSTS_FROM_API","GET_FILTERED_POSTS"]),
    ...mapMutations([
      "SET_POSTS_TO_STATE",
      "SET_TOTAL_PAGES",
      "SET_SEARCH_VALUE",
    ]),
    sortPosts() {
      this.POSTS.sort((a, b) => {
        if (this.isSortedByAlpha === false) {
          return b.id - a.id;
        } else {
          return a.id - b.id;
        }
      });
      this.isSortedByAlpha = !this.isSortedByAlpha;
    },
    sortPostsTitle() {
      this.POSTS.sort((a, b) => {
        if (this.isSortedByTitle === false) {
          if (a.title < b.title) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.title < b.title) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      this.isSortedByTitle = !this.isSortedByTitle;
    },
    sortPostsDesc() {
      this.POSTS.sort((a, b) => {
        if (this.isSortedByDesc === false) {
          if (a.body < b.body) {
            return -1;
          } else {
            return 1;
          }
        } else {
          if (a.body < b.body) {
            return 1;
          } else {
            return -1;
          }
        }
      });
      this.isSortedByDesc = !this.isSortedByDesc;
    }
  },
  watch: {},
  mounted() {
    this.GET_POSTS_FROM_API();
    // this.SET_POSTS_TO_STATE();
    // this.SET_TOTAL_PAGES();
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
}

table {
  border-collapse: collapse;
  margin: 20px 0;
}
.tr-head {
  padding: 0;
  width: 100%;
  height: 54px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: white;
  background-color: #474955;
}
.th-id {
  position: relative;
  border-left: 1px solid #474955;
  width: 10%;
  margin: 0;
  padding: 0 20px;
  text-align: center;
}
.th-h {
  position: relative;
  border: transparent;
  width: 40%;
}
.th-d {
  text-align: center;
  position: relative;
  width: 50%;
  padding: 0;
  margin: 0;
  border-right: 1px solid #474955;
  background: transparent;
}
th > img {
  position: absolute;
  top: 45%;
  left: 65%;
  padding: 0;
}
.tr {
  font-size: 13px;
  color: #474955;
  font-weight: 500;
  font-weight: 18px;
  align-self: center;
  text-align: justify;
}
.tr > td {
  border: 1px solid #e3e6ec;
  outline: none;
  margin: 0;
  padding: 0 10px;
  height: 50px;
}
.active, .activeTitle, .activeDesc  {
  transform: rotate(180deg);
}
</style>
