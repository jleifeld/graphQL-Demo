import pkg from './package'

export default {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],

  /*
  ** Nuxt.js modules
  */
  modules: [
      '@nuxtjs/apollo'
  ],

  /*
  ** Apollo client configuration
  */
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://shopware.test/storefront-api/v1/graphql',
        httpLinkOptions: {
          headers: {
            "x-sw-context-token": "6cef9552e22b4e9ba805bece74a508da",
            "x-sw-access-key": "SWSCVXVJDFRHCLRMA0Z0N1DPCW",
            "x-sw-language-id": "2fbb5fe2e29a4d70aa5854ce7ce3e20b"
          }
        }
      }
    }
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
