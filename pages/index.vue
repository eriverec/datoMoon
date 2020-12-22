<template>
  <div>
    <section class="hero">
      Hola
      <div class="hero-body">
        <div class="container">
          <div v-for="vestido in vestidos.slice(0, 2)" v-bind:key="vestido.slug">
            <div class="columns">
              <div class="column is-8 is-offset-2">
                <figure class="image">
                  <datocms-image :data="vestido.imagen.responsiveImage" />
                </figure>
              </div>
            </div>

            <section class="section">
              <div class="columns">
                <div class="column is-8 is-offset-2">
                  <div class="content is-medium">
                    <h2 class="subtitle is-4">
                      {{ formatDate(vestido.publicationDate) }}
                    </h2>
                    <h1 class="title">
                      <nuxt-link :to="`/vestidos/${vestido.slug}`">{{
                        vestido.titulo
                      }}</nuxt-link>
                    </h1>
                    
                  </div>
                </div>
              </div>
            </section>

            <div class="is-divider" />
          </div>
        </div>
      </div>
    </section>

    


  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'

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

          vestidos: allVestidos(first: 2, orderBy: _firstPublishedAt_DESC) {
            id
            titulo
            slug
            publicationDate: _firstPublishedAt
            
            imagen {
              responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
                ...imageFields
              }
            }
            estado {
              titulo
            }
          }
        }

        ${imageFields}
        ${seoMetaTagsFields}
      `
    })

    return { ready: !!data, ...data }
  },
  methods: {
    formatDate(date) {
      return format(parseISO(date), 'PPP')
    }
  },
  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.site.favicon)
  }
}
</script>
