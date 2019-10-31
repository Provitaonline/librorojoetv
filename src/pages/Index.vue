<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-medium">
        <g-image class="hero-bg-img" src="~/assets/images/home-hero-image.jpg"/>
        <div class="hero-body">
          <div class="container is-fullhd">
            <h1 class="hero-text title is-uppercase" v-html="$page.homeData.heroTitle" /><br>
            <h2 class="hero-text subtitle"v-html="$page.homeData.heroSubTitle" />
          </div>
          <a href="#" v-scroll-to="'#mapSection'" style="border:none;" class="explore"><font-awesome size="lg" :icon="['fas', 'angle-double-down']"/></a>
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
        <div class="section-header box is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Explicación</div>
        <div class="box is-size-5">
          {{$page.homeData.explanation}}
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

  export default {
    data() {
      let self = this
      return {
        geoJsonResources: [
          {
            url: '/mapdata/FormacionesVegetales.topojson',
            geoJsonLayer: null,
            legendTitleProperty: 'T_VE',
            isTopoJson: true,
            topoJsonObject: 'FormacionesVegetales'
          },
          {
            url: '/mapdata/VenezuelaAgua.topojson',
            geoJsonLayer: null,
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
            geoJsonLayer: null,
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
            geoJsonLayer: null,
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
