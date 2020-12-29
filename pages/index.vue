<template>
  <div>
    <section class="hero is-link is-fullheight-with-navbar t__center">
      <div class="hero-body">
        <div class="container">
          <p class="title">
            <b>¡Bienvenida!</b> <br />
            CAVALI es una tienda basada en Ecuador que piensa en lo mejor para
            ti, es por eso que solo vendemos productos de plata esterlina y
            acero inoxidable. Shop with us! xoxo
          </p>
        </div>
      </div>
    </section>
    <ul class="circles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <section class="section">
      <div class="style_wrapper__1BeS5 column is-8 is-offset-2">
        <nuxt-link :to="`/faldas`" class="style_root__3iCRH">
          <div class="style_rootInner__32CX1">
            <div>
              <div class="style_title__1jQC3"><b>Sección Faldas</b></div>
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
          </div>
        </nuxt-link>
      </div>
    </section>

    <section class="section">
      <div class="style_wrapper__1BeS5 column is-8 is-offset-2">
        <nuxt-link :to="`/faldas`" class="style_root__3iCRH">
          <div class="style_rootInner__32CX1">
            <div>
              <div class="style_title__1jQC3"><b> Sección Overoles</b></div>
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
          </div>
        </nuxt-link>
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

    <section class="section mr-6 ml-6">
      <h2 class="title t__center">Síguenos</h2>
      <div class="columns ">
        <div class="column  is-5 is-offset-1">
          <a href="https://www.instagram.com/by.moonshop/" target="blank">
          <div class="notification is-danger is-light t__custom">
            <strong> INS</strong><br />
            <strong> TA</strong><br />
            <strong> GRAM</strong><br />
          </div>
          </a>
        </div>
        <div class="column is-5 is-offset-0">
          <div class="notification is-info is-light t__custom">
            <strong> fa</strong><br />
            <strong> ce</strong><br />
            <strong> book</strong><br />
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

.section2 {
  padding: 1rem 5.5rem;
}

.t__custom {
  text-transform: uppercase;
  font-size: 40px;
  text-align: left;
  box-shadow: 0 2px 40px 0 rgba(23, 41, 64, 0.05), 0 5px 10px 0 rgba(23, 41, 64, 0.1);
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
  box-shadow: 0 2px 40px 0 rgba(23, 41, 64, 0.05),
    0 5px 10px 0 rgba(23, 41, 64, 0.1);

  text-decoration: none;
  color: var(--base-body-color);
  -webkit-transition: background 0.2s ease-in-out;
  transition: background 0.2s ease-in-out;
  background: linear-gradient(-30deg, #faedff 30%, #e9fcff 45%, #fff 60%);
  background-position: 50%;
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
  background-position: 30%;
}
</style>
