<template>
  <div>
    <nav class="navbar is-fixed-top animate__animated animate__fadeIn">
      <div class="navbar-brand">
        <nuxt-link class="navbar-item" to="/">
          <img src="/moonlogo.png" alt="Logo" />
        </nuxt-link>
        <div
          :aria-expanded="isActive"
          :class="{ 'is-active': isActive }"
          role="button"
          class="navbar-burger"
          aria-label="menu"
          data-target="collapse"
          @click="isActive = !isActive"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div
        id="collapse"
        :class="{ 'is-active': isActive }"
        class="navbar-menu is-paddingless"
      >
        <div class="navbar-end">
          <div class="buttons">
            <a class="button is-light" href="https://www.instagram.com/by.moonshop/" target="blank">
              <span class="icon is-small">
                <box-icon name="instagram" type="logo"></box-icon>
              </span>
              <span>@by.moonshop</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
.buttons {
  margin: 10px;
}
.buttons .button {
  margin-bottom: auto;
}
</style>

<script>
export default {
  data() {
    return {
      //navbarOpen: false,
      // control variables
      isActive: false,
      showNavbar: true
    };
  }
  /* methods: {
    toggleNavbar() {
      this.navbarOpen = !this.navbarOpen;
    }
  }*/
};
</script>
