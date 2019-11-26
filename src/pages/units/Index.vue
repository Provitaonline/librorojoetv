<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd is-uppercase has-text-centered">
            <h1 class="title" v-html="$page.unitCardsIndex.title"></h1>
          </div>
        </div>
      </section>

      <section class="section">
        <InteractiveMap
          :legendItems="$page.unitCardsIndex.legendItems"
          :geoJsonResources="geoJsonResources"
          :mapTitle="$page.unitCardsIndex.mapTitle"
        >
      </InteractiveMap>
      </section>

      <section class="section">
        <br>
        <div class="container is-size-4 has-text-centered">
          <hr>
          <g-link to="/references/units"><p>Bibliografía</p></g-link>
        </div>

      </section>

    </div>
  </Layout>
</template>

<page-query>
  query Home {
    unitCardsIndex: unitCardsIndex (path: "/content/units-index") {
      title
      mapTitle
    	legendItems {
        name
        isHeading
        isIndented
        label
        group
        color
        legend
        cardPath
      }
    }
  }
</page-query>

<style lang="scss" scoped>

  .hero {
    background-size: cover !important;
    background-position: center;
    text-align: center;
    overflow: hidden;
    position: relative;
  }

  .hero-bg-img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    /* opacity: 0.8; */
  }

  .hero-text {
    color: white;
    text-shadow:
      -1px -1px 0 black,
      1px -1px 0 black,
      -1px 1px 0 black,
      1px 1px 0 black;
  }

  .explore {
    position: absolute;
    bottom: 10px;
    left: 50%;
    color: white;
    transform: translate(-50%, 0);
  }

  .explore:hover {
    color: #BE1421;
  }

</style>

<script>
  import slugify from 'slugify';
  import InteractiveMap from '~/components/InteractiveMap.vue'
  import {threatCategories} from '~/assets/js/siteConfig.js'

  slugify.extend({'/': '-'})

  let threatCategoryIcons = {}
  for (let key in threatCategories) {
    threatCategoryIcons[key] = require('~/assets/svgs/' + key + '-icon.svg')
  }

  export default {
    threatCategories: threatCategories,
    threatCategoryIcons: threatCategoryIcons,
    data() {
      let self = this
      return {
        geoJsonResources: [
          {
            url: '/mapdata/UnidadesDePaisaje.topojson',
            legendTitleProperty: 'Sector_Leg',
            isLegendLookUp: true,
            isTopoJson: true,
            topoJsonObject: 'Unidades_de_paisaje_2010'
          },
          {
            url: '/mapdata/VenezuelaNoStates.topojson',
            isTopoJson: true,
            topoJsonObject: 'collection',
            geoJsonLayerOptions: {
              style: {
                weight: 1,
                color: '#504f54',
                dashArray: '2,3',
                opacity: 1,
                fillOpacity: 0,
                interactive: false
              }
            }
          }
        ]
      }
    },
    components: {
      InteractiveMap
    },
    created() {

    },
    mounted () {

    },
    updated() {

    },
    computed: {

    },
    methods: {
      makeLink(t) {
        return slugify(t, {lower: true})
      }
    },
    watch: {
    }
  }
</script>
