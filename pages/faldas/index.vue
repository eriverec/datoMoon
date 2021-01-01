<template>
  <div>
    <section class="section mt-6">
      <div class="title column is-8 is-offset-2">
        <nav class="breadcrumb has-succeeds-separator" aria-label="breadcrumbs">
          <ul>
            <li>
              <NLink to="/"> Home </NLink>
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
                <div class="numerical-rating mid" data-rating="3"></div>
                <h3>{{ falda.titulo }}</h3>
                <span>{{ formatDate(falda.publicationDate) }}</span>
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

          faldas: allFaldas(orderBy: _firstPublishedAt_DESC) {
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
