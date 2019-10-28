// Import main css
import '~/assets/style/index.scss';

import Buefy from 'buefy'

// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import VueScrollTo from 'vue-scrollto'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faArrowDown, faAngleDoubleDown, faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false;
library.add(faFacebook, faTwitter, faArrowDown, faAngleDoubleDown, faSyncAlt)

export default function (Vue, { router, head, isClient }) {
  head.htmlAttrs = { lang: 'es' }
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.component('font-awesome', FontAwesomeIcon)

  Vue.use(VueScrollTo)

  Vue.use(Buefy)

  if (isClient) {
    Vue.component('l-map', () => import ('vue2-leaflet').then(m => m.LMap))
    Vue.component('l-tile-layer', () => import ('vue2-leaflet').then(m => m.LTileLayer))
    Vue.component('l-geo-json', () => import ('vue2-leaflet').then(m => m.LGeoJson))
    Vue.component('l-marker', () => import ('vue2-leaflet').then(m => m.LMarker))
    Vue.component('l-icon', () => import ('vue2-leaflet').then(m => m.LIcon))
    Vue.component('l-control', () => import ('vue2-leaflet').then(m => m.LControl))
  }

}
