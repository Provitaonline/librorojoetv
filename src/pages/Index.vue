<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-large">
        <g-image class="hero-bg-img" src="~/assets/images/home-hero-image.jpg"/>
        <div class="hero-body">
          <div style="max-width: 80%;" class="container is-fullhd">
            <h1 class="hero-text title is-uppercase is-size-2 is-size-4-mobile" v-html="$page.homeData.heroTitle" />
          </div>

        </div>
      </section>

      <section class="section">
        <div class="box is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Explora</div>
        <div class="tile is-ancestor">
          <div class="tile">
            <div v-for="item in $page.homeData.indexCards" class="tile is-parent">
              <div class="card tile is-child">
                <header class="card-header">
                  <p class="card-header-title is-centered">
                    <g-link :to="item.link">{{item.title}}</g-link>
                  </p>
                </header>
                <div class="card-image">
                  <figure style="border-top: 1px solid rgba(20, 20, 20, 0.1); border-bottom: 1px solid rgba(20, 20, 20, 0.1);" class="image is-4by3">
                    <g-link :to="item.link"><g-image class="img-hover-effect" :src="item.image"/></g-link>
                  </figure>
                </div>
                <div class="card-content">
                  <div class="content has-text-centered">
                    {{item.text}}
                    <br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container has-text-centered">
          <hr>
          <a href="/files/libro_rojo_ecosistemas_terrestre.pdf"><p><font-awesome :icon="['fas', 'arrow-down']" /> Descarga el documento PDF (63 MB)</p></a>
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
      indexCards {
        title
        link
        image
        text
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

  .hero-body {
    padding-bottom: 2rem !important;
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
    font-weight: 300;
    background: rgba(0, 0, 0, .2);
    /*text-shadow:
      -1px -1px 0 black,
      1px -1px 0 black,
      -1px 1px 0 black,
      1px 1px 0 black;*/
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

  .card-header-title {
    background-color: #f8e7e8;
  }

  .img-hover-effect {
    transition: all ease 0.2s;
    //filter: grayscale(90%);
    opacity: 0.9;
  }

  .img-hover-effect:hover {
    //filter: grayscale(0%);
    opacity: 1;
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
