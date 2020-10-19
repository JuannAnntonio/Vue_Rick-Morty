<template>
  <nav
        class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <ul class="pagination-list">
          <li>
            <button
              class="button is-success pagination-previous"
              v-on:click="changePage(page - 1)"
            >
              <font-awesome-icon icon="angle-double-left" />
            </button>
          </li>
          <li v-if="page > 1">
            <a class="pagination-link" v-on:click="changePage(1)">1</a>
          </li>
          <li v-if="page > 3">
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <li v-if="page > 2">
            <a class="pagination-link" v-on:click="changePage(page - 1)">{{
              page - 1
            }}</a>
          </li>
          <li>
            <a
              class="pagination-link is-current is-success"
              aria-current="page"
              >{{ page }}</a
            >
          </li>
          <li v-if="page < pages">
            <a class="pagination-link" v-on:click="changePage(page + 1)">{{
              page + 1
            }}</a>
          </li>
          <li v-if="page < pages - 2">
            <span class="pagination-ellipsis"> &hellip;</span>
          </li>
          <li v-if="page < pages - 1">
            <a class="pagination-link" v-on:click="changePage(pages)">{{
              pages
            }}</a>
          </li>
          <li>
            <button
              class="button is-success pagination-next"
              v-on:click="changePage(page + 1)"
            >
              <font-awesome-icon icon="angle-double-right" />
            </button>
          </li>
        </ul>
      </nav>
</template>

// Recibe parametro pagina desde un componente padre (App)
<script>
import axios from "axios";
export default {
  props: ["page"],
  data: function () {
    return {
      personajes: [],
      pages: 1 
    };
  },
  methods: {
    changePage(pagina) {
      this.$props.page = pagina <= 0 || pagina > this.$props.page 
                        ? this.$props.page : pagina;
      this.fetch();
    },
    fetch() {
      const params = {
        page: this.$props.page,
      };
      let result = axios
        .get("https://rickandmortyapi.com/api/character", { params })
        .then((res) => {
          console.log(res.data);
          this.personajes = res.data.results;
          this.$props.page = res.data.info.pages;
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
};
</script>