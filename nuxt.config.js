export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Inicio',
    titleTemplate: '%s - Moon',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'google-site-verification', content: 'rQ1gW0dtlxhf7KN_YaFnojE1DV9hmxjZsRfjJ-WW5Lc' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css'
      },
    ],
    script: [{
      src: 'https://www.googletagmanager.com/gtag/js?id=UA-185988551-1',
      async: true
    },
    {
      src: 'https://unpkg.com/boxicons@latest/dist/boxicons.js'
    }
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    'assets/main.css',
    'boxicons/css/boxicons.min.css',

  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/datocms-image',
    {
      src:"@/plugins/rellax",
    }

  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/date-fns',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/bulma',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    
    '@nuxtjs/markdownit',
    '@nuxtjs/google-analytics',

  ],

  dateFns: {
    locales: ['es'],
    defaultLocale: 'es',
    format: 'dd-MM-yyyy',
    methods: ['format'],
  },

  markdownit: {
    injected: true,
    html: true,
    quotes: '“”‘’',
    linkify: true,
    typographer: true
  },

  googleAnalytics: {
    id: 'UA-185988551-1'
  },


  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    postcss: {
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  }
}
