<template>
  <div>
   <Menu />
    <Nuxt />

    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Bulma - Blog theme</strong> by
          <a href="https://gonzalojs.com">Gonzalo Gutierrez</a>. Based on the
          <a href="http://jigsaw-blog-staging.tighten.co/">jigsaw-blog</a>. The
          source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>
        </p>
      </div>
    </footer>
  </div>
</template>

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

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

nav.navbar {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
}
</style>
