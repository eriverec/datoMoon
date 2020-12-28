<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="columns">
          <div class="column is-8 is-offset-2">
            <figure class="image is__slug">
              <datocms-image :data="falda.imagen.responsiveImage" />
            </figure>
          </div>
        </div>

        <section class="section">
          <div class="columns">
            <div class="column is-8 is-offset-2">
              <div class="content is-medium">
                <h2 class="subtitle is-4">
                  {{ formatDate(falda.publicationDate) }}
                </h2>
                <h1 class="title">
                  <nuxt-link :to="`/faldas/${falda.slug}`">
                    {{ falda.titulo }}
                  </nuxt-link>
                </h1>
                <div v-html="falda.contenido" />
                <h2>{{ falda.categ.titulo }}</h2>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
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
        query BlogfaldaQuery($slug: String!) {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }

          falda(filter: { slug: { eq: $slug } }) {
            seo: _seoMetaTags {
              ...seoMetaTagsFields
            }
            id
            titulo
            slug
            publicationDate: _firstPublishedAt
            contenido
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
      `,
      variables: {
        slug: params.id
      }
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

    return toHead(this.falda.seo, this.site.favicon);
  }
};
</script>


<style  scoped>
.is__slug{
width: 100%;
    /* margin: auto; */
    text-align: center;
}

</style>
