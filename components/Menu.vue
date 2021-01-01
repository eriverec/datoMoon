<template>
  <nav class="navbar is-fixed-top animate__animated animate__fadeIn">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img src="/moonlogo.png" alt="Logo" />
        </nuxt-link>
        <span class="navbar-burger burger" v-on:click="toggleNavbar">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
      <div :class="['navbar-menu', navbarOpen && 'is-active']">
        <div class="navbar-end">
          <nuxt-link
            class="navbar-item is-active is-size-5 has-text-weight-semibold"
            to="/"
          >
            Home
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {
      navbarOpen: false
    };
  },
  methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    }
  }
};
</script>
