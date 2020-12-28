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

    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title column is-8 is-offset-2">Últimas publicaciones</h1>
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
                <figure class="image" style="width:100%">
                  <datocms-image :data="falda.imagen.responsiveImage" />
                </figure>
              </div>
            </div>

            <div class="is-divider" />
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="notification is-primary is-light column is-8 is-offset-2">
        <button class="delete"></button>
        Primar lorem ipsum dolor sit amet, consectetur adipiscing elit lorem
        ipsum dolor. <strong>Pellentesque risus mi</strong>, tempus quis
        placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet
        fringilla. Nullam gravida purus diam, et dictum
        <a>felis venenatis</a> efficitur. Sit amet, consectetur adipiscing elit
      </div>
    </section>
    <section class="section">
      <h1 class="title column is-8 is-offset-2">Categorias destacadas</h1>  
      <div class="style_wrapper__1BeS5 column is-8 is-offset-2">
        <a href="https://dashboard.datocms.com/signup" class="style_root__3iCRH"
          ><div class="style_rootInner__32CX1">
            <div>
              <div class="style_title__1jQC3">Start using DatoCMS today</div>
              <div class="style_subtitle__UtQrM">
                According to Gartner 89% of companies plan to compete primarily
                on the basis of customer experience this year. Don't get caught
                unprepared.
              </div>
            </div>
            <div class="style_action__32sxL">
              <div class="style_root__2jAzX">
                <div class="style_root__-6jDT style_fsBig__vL5g8">
                  Try it for free!
                </div>
              </div>
            </div>
          </div></a
        >
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
              responsiveImage(
                imgixParams: { fit: crop, w: 860, h: 500, auto: format }
              ) {
                ...imageFields
                srcSet
                webpSrcSet
                sizes
                src
                width
                aspectRatio
                alt
                title
                base64
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

.style_wrapper__1BeS5 {
  max-width: var(--page-width-with-margin);
  
  padding-left: var(--page-margin);
  padding-right: var(--page-margin);
}

.style_root__3iCRH {
  display: block;
  padding: calc(22.4px + 4.8vw);
  background: #fff;
  border-radius: 5px;
  box-shadow: var(--box-shadow);
  box-shadow: 0 2px 40px 0 rgba(23, 41, 64, 0.05),
    0 5px 10px 0 rgba(23, 41, 64, 0.1);

  text-decoration: none;
  color: var(--base-body-color);
  -webkit-transition: background 0.2s ease-in-out;
  transition: background 0.2s ease-in-out;
  background: linear-gradient(-30deg, #faedff 30%, #e9fcff 45%, #fff 60%);
  background-position: 0 0;
  background-size: 200vw 100%;
}

.style_rootInner__32CX1 {
  max-width: 750px;
  margin: 0 auto;
  text-align: center;
}

.style_title__1jQC3 {
  font-family: var(--font-headline);
  font-size: calc(19.4px + 2.55vw);
  margin-bottom: 20px;
  line-height: 1.1;
}

.style_root__3iCRH:hover {
    background-position: 50%;
}
</style>
