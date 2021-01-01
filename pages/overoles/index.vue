<template>
  <div>
    <section class="section mt-6">
      <Breadcrumb/>

      <div class="columns is-multiline">
        <div
          class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
          v-for="overol in overols"
          v-bind:key="overol.slug"
        >
          <nuxt-link
            :to="`/overoles/${overol.slug}`"
            class="listing-item-container compact"
            data-marker-id="296296"
            ><div class="listing-item">
              <datocms-image
                :data="overol.imagen.responsiveImage"
                class="img__sec"
              />
              <div class="listing-badge now-open">{{ overol.categ.titulo }}</div>
              <div class="listing-item-content">

                <div class="tag is-success" v-if="overol.stock.titulo === 'Disponible'">{{ overol.stock.titulo }}</div>
                <div class="tag is-danger" v-else>{{ overol.stock.titulo }}</div>



                <h3>{{ overol.titulo }}</h3>
                <span>{{ formatDate(overol.publicationDate) }}</span>
              </div>
              <span class="like-icon"></span></div
          ></nuxt-link>
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

  async asyncData({ params }) {
    const data = await request({
      query: gql`
        {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }

          overols: allOverols(orderBy: _firstPublishedAt_DESC) {
            id
            titulo
            slug
            publicationDate: _firstPublishedAt

            imagen {
              responsiveImage(imgixParams: { fit: crop, w: 860 }) {
                ...imageFields
              }
            }
            categ {
              titulo
            }

            stock{
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
