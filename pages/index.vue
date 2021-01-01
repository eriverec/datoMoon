<template>
  <div>
    <section class="hero is-fullheight-with-navbar t__center hero__imagen">
      <div class="hero-body">
        <div class="container">
          <p class="intro__2 animate__animated animate__fadeIn">
            <b class="blanco ">elige</b> <br />
             <b class="blanco">tu</b> <br/>
             <b class="blanco">diseño</b> 
          </p>
          
        </div>
      </div>
    </section>


<section class="section">
    <div class="notification is-primary column is-8 is-offset-2">
   
      <b>¡Bienvenida!</b> <br />
            CAVALI es una tienda basada en Ecuador que piensa en lo mejor para
            ti, es por eso que solo vendemos productos de plata esterlina y
            acero inoxidable. Shop with us! xoxo
    </div>
</section>
    <section class="section">
      <div class="style_wrapper__1BeS5 column is-8 is-offset-2">
        <nuxt-link :to="`/faldas`" class="style_root__3iCRH falda__imagen">
          <div class="style_rootInner__32CX1">
            <div>
              <div class="style_title__1jQC3"><b>Sección Faldas</b></div>
             
            </div>
            <div class="style_action__32sxL">
              <div class="style_root__2jAzX">
                <div class="button is-info is-light">
                  Click para entrar!
                </div>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </section>

    <section class="section">
      <div class="style_wrapper__1BeS5 column is-8 is-offset-2">
        <nuxt-link :to="`/faldas`" class="style_root__3iCRH overol__imagen">
          <div class="style_rootInner__32CX1">
            <div>
              <div class="style_title__1jQC3"><b> Sección Overoles</b></div>
             
            </div>
            <div class="style_action__32sxL">
              <div class="style_root__2jAzX">
                <div class="button is-info is-light">
                  Click para entrar!
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
        <div class="column column is-8 is-offset-2 ">
          <div class=" has-text-centered is-fluid">
            <div class="hero is-light " >
              <div class="hero-body">
                <h2 class="title is-4">Entrega a domicilio </h2>
                <div class="">
                  <div class="field has-addons has-addons-centered">
                    Solo para Guayaquil
                  </div>
                  <img class="logo__footer" src="/fast-delivery.png" alt="Logo Footer" /> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <h2 class="title t__center">Escríbenos</h2>
      <div class="columns ">
        <div class="column bloque__whatsaap">
          <a href="https://api.whatsapp.com/send?phone=593986543945&text=Hola,%20quiero%20un%20pedido!" target="blank" class="whatsapp__imagen">
            <div class="notification is-success t__custom">
              <img class="img__whatsapp" src="~static/whatsapp-logo-132.png"/><br />
              <strong> whatsapp</strong>
            </div>
          </a>
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





</style>
