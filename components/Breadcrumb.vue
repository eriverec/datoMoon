<template>
  <div class="column is-8 is-offset-2">
    <nav class="breadcrumb has-succeeds-separator mb-5" aria-label="breadcrumbs">
      <ul>
        <li>
          <NLink to="/"> Inicio </NLink>
        </li>
        <li
          v-for="(crumb, index) in crumbs"
          :key="index"
          property="itemListElement"
          typeof="ListItem"
        >
          <NLink property="item" typeof="WebPage" :to="crumb.path">
            <span property="name">{{
              $route.fullPath === crumb.path && title !== null
                ? title
                : crumb.title
            }}</span>
          </NLink>
          <meta property="position" :content="index + 2" />
        </li>
      </ul>
    </nav>
  </div>
</template>


<script>

const titleCase = require("ap-style-title-case");

export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },

  computed: {
    crumbs() {
      const fullPath = this.$route.fullPath;
      const params = fullPath.startsWith("/")
        ? fullPath.substring(1).split("/")
        : fullPath.split("/");
      const crumbs = [];
      let path = "";
      params.forEach((param, index) => {
        path = `${path}/${param}`;
        const match = this.$router.match(path);
        if (match.name !== null) {
          crumbs.push({
            title: titleCase(param.replace(/-/g, " ")),
            ...match
          });
        }
      });
      return crumbs;
    }
  },


};
</script>
