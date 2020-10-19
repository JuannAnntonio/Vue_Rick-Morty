<template>
  <div id="app">
    <div class="hero is-white is-gradient is-bold">
      <div class="hero-boddy">
        <h1 class="title">
          <span class="has-text-success">R&M| </span>
          <span class="subtitle">Personajes</span>
        </h1>

        <div class="field has-addons is-pulled-right">
          <div class="control">
            <input
              type="text"
              class="input is-rounded"
              v-model="search"
              v-on:keyup.enter="searchData()"
            />
          </div>
          <div class="control">
            <button
              class="button is-success is-rounded"
              v-on:click="searchData()"
            >
              Buscar
            </button>
          </div>
        </div>

        <br /><br /><br />
      </div>
    </div>

    <div class="container">
      <div
        class="columns is-desktop is-mobile is-tablet is-multiline is-centered"
      >
        <personaje
          @show-modal="showModal"
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
    </div>

    <div
      class="modal"
      :class="{ 'is-active': isModalActive }"
      v-if="isModalActive"
    >
      <div class="modal-background" @click="isModalActive = false"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ currentPersonaje.name }}</p>
          <button
            class="delete"
            aria-label="close"
            v-on:click="isModalActive = false"
          ></button>
        </header>
        <section class="modal-card-body">
          <p><strong>Genero:</strong> {{ currentPersonaje.gender }}</p>
          <p><strong>Estado:</strong> {{ currentPersonaje.status }}</p>
          <p><strong>Raza:</strong> {{ currentPersonaje.species }}</p>
          <p><strong>Tipo:</strong> {{ currentPersonaje.type }}</p>
          <p><strong>Origin:</strong> {{ currentPersonaje.origin.name }}</p>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
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
      search: "",
      isModalActive: false,
      currentPersonaje: {},
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      const params = {
        page: this.page,
        name: this.search,
      };
      axios
        .get("https://rickandmortyapi.com/api/character", { params })
        .then((res) => {
          //console.log(res.data);
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
    searchData() {
      console.info("searchData");
      this.page = 1;
      this.fetch();
    },
    showModal(id) {
      this.fetchOne(id);
    },
    async fetchOne(id) {
      let result = await axios.get(
        "https://rickandmortyapi.com/api/character/" + id + "/"
      );
      this.isModalActive = true;
      this.currentPersonaje = result.data;
    },
  },
};
</script>

