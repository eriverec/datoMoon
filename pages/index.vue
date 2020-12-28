<template>
  <div>
 
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Primary title
          </h1>
          <h2 class="subtitle">
            <a href="https://vuejs.org/">Vuejs</a> to make projects easily and
            with a Unique and pleasant style, Vuesax is created from scratch and
            designed for all types of developed from the frontend lover to the
            backend that wants to easily create your visual approach to the end
            user
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="columns is-multiline ">
        <div
          class="column is-8 is-offset-2"
          v-for="falda in faldas.slice(0, 2)"
          v-bind:key="falda.slug"
        >
          <div class="box">
            <article class="media">
              <div class="media-left">
                <figure class="image is-128x128">
                  <datocms-image :data="falda.imagen.responsiveImage" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong
                      ><nuxt-link :to="`/faldas/${falda.slug}`">{{
                        falda.titulo
                      }}</nuxt-link></strong
                    >
                    <small
                      ><div class="tags has-addons">
                        <span class="tag"> <b>Categoria</b></span>
                        <span class="tag is-primary">{{
                          falda.categ.titulo
                        }}</span>
                      </div></small
                    >
                    <small> {{ formatDate(falda.publicationDate) }}</small>
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Aenean efficitur sit amet massa fringilla egestas. Nullam
                    condimentum luctus turpis.
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply">
                      <span class="icon is-small">
                        <i class="fas fa-reply" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="retweet">
                      <span class="icon is-small">
                        <i class="fas fa-retweet" aria-hidden="true"></i>
                      </span>
                    </a>
                    <a class="level-item" aria-label="like">
                      <span class="icon is-small">
                        <i class="fas fa-heart" aria-hidden="true"></i>
                      </span>
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="hero">
      <div class="hero-body">
        <h1 class="title column is-8 is-offset-2">Últimas publicaciones</h1>
        <div class="container">
          <div v-for="falda in faldas.slice(0, 2)" v-bind:key="falda.slug">
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
                    <span class="tag is-primary">{{ falda.categ.titulo }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="column is-8 is-offset-2">
                <figure class="image" style="width: 100%;">
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
              responsiveImage {
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

.image {
  text-align: center;
}
</style>
