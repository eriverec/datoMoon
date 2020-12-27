<template>
  <div>
    <section class="hero is-medium is-danger is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            ¡Bienvenida!
          </h1>
          <h2 class="subtitle">
            CAVALI es una tienda basada en Ecuador que piensa en lo mejor para
            ti, es por eso que solo vendemos productos de plata esterlina y
            acero inoxidable. Shop with us! xoxo
          </h2>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="hero-body">
        <h1 class="title column is-8 is-offset-2">Últimas publicaciones</h1>
        <div class="container">
          <div
            v-for="falda in faldas.slice(0, 2)"
            v-bind:key="falda.slug"
          >
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <div class="content is-medium">
                  <h1 class="title">
                    <nuxt-link :to="`/faldas/${falda.slug}`">{{
                      falda.titulo
                    }}</nuxt-link>
                  </h1>
                  <h2 class="subtitle is-4">
                    {{ formatDate(falda.publicationDate) }}
                  </h2>
                  <div class="tags has-addons">
                    <span class="tag"> <b>Categoria</b></span>
                    <span class="tag is-primary">{{
                      falda.categ.titulo
                    }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-8 is-offset-2">
                <figure class="image">
                  <datocms-image :data="falda.imagen.responsiveImage" />
                </figure>
              </div>
            </div>

            <div class="is-divider" />
          </div>
        </div>
      </div>
    </section>

    <!-- newsletter -->
    <section class="section">
      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="container has-text-centered is-fluid">
            <div class="hero is-light">
              <div class="hero-body">
                <h2 class="title is-4">Sign up for our newsletter</h2>
                <div class="column is-6 is-offset-3">
                  <div class="field has-addons has-addons-centered">
                    <div class="control is-expanded">
                      <input
                        class="input"
                        type="text"
                        placeholder="Email address"
                      />
                    </div>
                    <div class="control">
                      <a class="button is-info">
                        Subscribe
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- newsletter -->
    <section class="section">
      <h1 class="title column is-8 is-offset-1">Categorias destacadas</h1>
      <div class="columns is-variable is-6 is-desktop">
        <div class="column">
          <div class="container has-text-centered is-fluid">
            <div class="hero is-light">
              <div class="hero-body">
                <div class="column is-6 is-offset-3">
                  <figure class="image is-128x128  margin__auto">
                    <img
                      src="https://bulma.io/images/placeholders/128x128.png"
                    />
                  </figure>
                  <div class="bd-index-buttons hero-buttons">
                    <nuxt-link
                      class="button is-medium is-info is-rounded  "
                      to="/faldas"
                    >
                      <span class="mr-4"><strong>Faldas</strong></span>

                      <box-icon
                        name="hand-right"
                        type="solid"
                        animation="tada"
                        color="#fff"
                      ></box-icon>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="container has-text-centered is-fluid">
            <div class="hero is-light">
              <div class="hero-body">
                <div class="column is-6 is-offset-3">
                  <figure class="image is-128x128  margin__auto">
                    <img
                      src="https://bulma.io/images/placeholders/128x128.png"
                    />
                  </figure>
                  <div class="bd-index-buttons hero-buttons">
                    <nuxt-link
                      class="button is-medium is-info is-rounded "
                      to="https://bulma.io/documentation/columns/basics"
                    >
                      <span class="mr-4"><strong>Overoles</strong></span>

                      <box-icon
                        name="hand-right"
                        type="solid"
                        animation="tada"
                        color="#fff"
                      ></box-icon>
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from "~/lib/datocms";
import { toHead } from "vue-datocms";
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";

export default {
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }

          faldas: allFaldas(first: 4, orderBy: _firstPublishedAt_DESC) {
            id
            titulo
            slug
            publicationDate: _firstPublishedAt

            imagen {
              responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
                ...imageFields
              }
            }
            categ {
              titulo
            }
          }
        }

        ${imageFields}
        ${seoMetaTagsFields}
      `
    });

    return { ready: !!data, ...data };
  },
  methods: {
    formatDate(date) {
      return format(parseISO(date), "PPP");
    }
  },
  head() {
    if (!this.ready) {
      return;
    }

    return toHead(this.site.favicon);
  }
};
</script>

<style scoped>
.margin__auto {
  margin: auto;
}
</style>
