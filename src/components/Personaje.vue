<template>
  <div class="column is-6-mobile is-4-tablet is-3-desktop">
    <div class="card">
      <div class="card-header">
        <img v-bind:src="personaje.image" />
      </div>
      <div class="card-content">
        <h3 class="title is-size-4">{{ personaje.name }}</h3>
        <button
          class="button is-success is-rounded is-small"
          @click="showMore(personaje.id)"
        >
          Ver más
        </button>
      </div>
    </div>
  </div>
</template>

// Recibe parametro personaje desde un componente padre (App)
<script>
export default {
  props: ["personaje"],
  methods: {
    showMore(id) {
      this.$emit("show-modal", id);
    },
  },
};
</script>