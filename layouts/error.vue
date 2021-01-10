<template>
  <div>
    <section class="section mt-6 page__not">
      <h1 v-if="error.statusCode === 404">Page <br/> not <br/> found <br/> :(</h1>
      <h1 v-else>An error occurred</h1>
    </section>
  </div>
</template>

<script>
import Artistas from "../../monostereo/components/Artistas.vue";
export default {
  components: { Artistas },
  props: ["error"],
  layout: "error" // you can set a custom layout for the error page
};
</script>
