<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="is-uppercase has-text-centered">
            <h1 class="title" v-html="$page.vegetationCardsIndex.title"></h1>
          </div>
        </div>
      </section>

      <section class="section">
        <InteractiveMap
          :legendItems="$page.vegetationCardsIndex.legendItems"
          :geoJsonResources="geoJsonResources"
          :mapTitle="$page.vegetationCardsIndex.mapTitle"
        >
      </InteractiveMap>
      </section>

      <section class="section">
        <br>
        <div class="section-header box is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Lista alfabética de fichas</div>
        <div style="width: 85%;" class="container is-size-5 is-size-6-mobile">
          <div v-for="item in $page.vcards.edges" class="media">
            <figure class="media-left is-hidden-mobile">
              <g-link :to="'/vcards/' + makeLink(item.node.title)"><g-image :src="item.node.cardimage"></g-image></g-link>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <img style="margin-bottom: -0.5rem;" :src="$options.threatCategoryIcons[item.node.category]" height="30" width="30">&nbsp;</img>
                  <g-link :to="'/vcards/' + makeLink(item.node.title)"><strong v-html="item.node.title"></strong> ({{$options.threatCategories[item.node.category].text}}) </g-link>
                  <br>
                  <span v-if="item.node.areain2010">
                    {{item.node.areain1988 | number}} km<sup>2</sup> en 1988<br>
                    {{item.node.areain2010 | number}} km<sup>2</sup> en 2010<br>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="container is-size-4 has-text-centered">
          <hr>
          <g-link to="/references/vcards"><p>Bibliografía <small><font-awesome size="xs" :icon="['fas', 'link']"/></small></p></g-link>
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
    }
    vegetationCardsIndex: vegetationCardsIndex (path: "/content/vcards-index") {
      title
      mapTitle
    	legendItems {
        name
        group
        color
        legend
        cardPath
      }
    }
    vcards: allVegetationCard (sortBy: "title", order: ASC) {
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
      makeLink(t) {
        return slugify(t, {lower: true})
      }
    },
    watch: {
    }
  }
</script>
