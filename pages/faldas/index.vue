<template>
  <div>
    <section class="section mt-6">
      <Breadcrumb />

      <div class="columns is-multiline">
        <div
          class="column is-half-tablet is-one-third-desktop is-one-quarter-fullhd"
          v-for="falda in faldas"
          v-bind:key="falda.slug"
        >
          <nuxt-link
            :to="`/faldas/${falda.slug}`"
            class="listing-item-container compact"
            data-marker-id="296296"
            ><div class="listing-item">
              <datocms-image
                :data="falda.imagen.responsiveImage"
                class="img__sec"
              />
              <div class="listing-badge now-open">{{ falda.categ.titulo }}</div>
              <div class="listing-item-content">
                <div
                  class="tag is-success"
                  v-if="falda.stock.titulo === 'Disponible'"
                >
                  {{ falda.stock.titulo }}
                </div>
                <div class="tag is-danger" v-else>
                  {{ falda.stock.titulo }}
                </div>
                <h3>{{ falda.titulo }}</h3>
                <span>{{ formatDate(falda.publicationDate) }}</span>

                <!-- <span>{{ $dateFns.format(new Date(falda.publicationDate), "EEEE h, y") }}</span>-->
              </div>
              <!-- <span class="like-icon"></span>-->
            </div>
          </nuxt-link>
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

import es from "date-fns/locale/es";

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

          faldas: allFaldas(orderBy: _firstPublishedAt_DESC) {
            id
            titulo
            slug
            publicationDate: _updatedAt

            imagen {
              responsiveImage(imgixParams: { fit: crop, w: 860 }) {
                ...imageFields
              }
            }
            categ {
              titulo
            }
            stock {
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
      //return format(parseISO(date), "PPP");
      //return format(parseISO(date), "PPP");

      return format(parseISO(date), "PPP");
    }
  },
 /* head() {
    if (!this.ready) {
      return;
      
    }

    return toHead(this.site.favicon);
  },*/
  head() {
    return {
      title: "Faldas",
      titleTemplate: "%s - Moon",
    };
  },
};
</script>
