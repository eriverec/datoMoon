<template>
  <div>
    <section class="section">
      <h1 class="title column is-8 is-offset-2">Últimas publicaciones</h1>
      <div class="columns is-multiline ">
        <div
          class="column"
          v-for="falda in faldas.slice(0, 3)"
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

          faldas: allFaldas(first: 2, orderBy: _firstPublishedAt_DESC) {
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
