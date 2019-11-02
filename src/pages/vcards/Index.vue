<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd is-uppercase has-text-centered">
            <h1 class="title">Riesgo de colapso de los<br>ecosistemas terrestres de Venezuela</h1>
          </div>
        </div>
      </section>

      <section class="section">
        <InteractiveMap
          :legendItems="$page.homeData.vegetation"
          :geoJsonResources="geoJsonResources"
        >
      </InteractiveMap>
      </section>

      <section class="section">
        <br>
        <div class="section-header box is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Lista de fichas de información</div>
        <div style="width: 85%;" class="container is-size-5">
          <div v-for="item in $page.vcards.edges" class="media">
            <figure class="media-left">
              <g-image :src="item.node.cardimage"></g-image>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <img style="margin-bottom: -0.5rem;" :src="$options.threatCategoryIcons[item.node.category]" height="30" width="30">&nbsp;</img>
                  <strong v-html="item.node.title"></strong> ({{$options.threatCategories[item.node.category].text}})
                  <br>
                  Superficie en 1988 (km<sup>2</sup>): {{item.node.areain1988 | number}}<br>
                  Superficie en 2010 (km<sup>2</sup>): {{item.node.areain2010 | number}}<br>
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  </Layout>
</template>

<page-query>
  query Home {
    homeData: homeData (path: "/content/home") {
      title
      heroTitle
      heroSubTitle
      explanation
    	vegetation {
        name
        group
        color
        legend
        cardPath
      }
    }
    vcards: allVegetationCard {
      edges {
        node {
          title
          formattedtitle
          category
          description
          cardimage (width: 100, height: 100, quality: 90)
          areain1988
          areain2010
        }
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
  import InteractiveMap from '~/components/InteractiveMap.vue'
  import {threatCategories} from '~/assets/js/siteConfig.js'

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
            url: '/mapdata/FormacionesVegetales.topojson',
            legendTitleProperty: 'T_VE',
            isTopoJson: true,
            topoJsonObject: 'FormacionesVegetales'
          },
          {
            url: '/mapdata/VenezuelaAgua.topojson',
            isTopoJson: true,
            topoJsonObject: 'collection',
            geoJsonLayerOptions: {
              style: {
                weight: 0,
                opacity: 0,
                fillOpacity: 1,
                fillColor: '#BDE6E0',
                interactive: false
              }
            }
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
          },
          {
            url: '/mapdata/Saxicola.json',
            legendTitleProperty: 'name',
            makePointsToCircles: true,
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

    },
    watch: {
    }
  }
</script>
