// Import main css
import '~/assets/style/index.scss';

// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

// import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
//import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

/*delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});*/

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  if (isClient) {
    console.log('Client');
    Vue.component("l-map", () => import ('vue2-leaflet').then(m => m.LMap));
    Vue.component("l-tile-layer", () => import ('vue2-leaflet').then(m => m.LTileLayer));
    Vue.component("l-marker", () => import ('vue2-leaflet').then(m => m.LMarker));
  }

}
