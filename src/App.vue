<template>
  <div id="app">
    <div class="hero is-white is-gradient is-bold">
      <div class="hero-boddy">
        <h1 class="title">
          <span class="has-text-success">RM</span>
          <span class="subtitle">Personajes</span>
        </h1>

        <button class="button is-success is-rounded" v-on:click="fetch">
          Consultar
        </button>
      </div>
    </div>

    <div class="container">
      <div
        class="columns is-desktop is-mobile is-tablet is-multiline is-centered"
      >
        <personaje
          v-for="personaje of personajes"
          v-bind:key="personaje.id"
          v-bind:personaje="personaje"
        />
      </div>

      <br />

      <nav
        class="pagination is-centered"
        role="navigation"
        aria-label="pagination"
      >
        <a class="pagination-previous" v-on:click="changePage(page - 1)"
          >Previous</a
        >
        <a class="pagination-next" v-on:click="changePage(page + 1)"
          >Next page</a
        >
        <ul class="pagination-list">
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
            <a class="pagination-link is-current" aria-current="page">{{
              page
            }}</a>
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
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Personaje from "./components/Personaje";

export default {
  name: "App",
  components: {
    Personaje,
  },
  data: function () {
    return {
      personajes: [],
      page: 1,
      pages: 1,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const params = {
        page: this.page,
      };
      let result = axios
        .get("https://rickandmortyapi.com/api/character", { params })
        .then((res) => {
          console.log(res.data);
          this.personajes = res.data.results;
          this.pages = res.data.info.pages;
        })
        .catch((err) => {
          console.error(err);
        });
    },
    changePage(pagina) {
      this.page = pagina <= 0 || pagina > this.pages ? this.page : pagina;
      this.fetch();
    },
  },
};
</script>

