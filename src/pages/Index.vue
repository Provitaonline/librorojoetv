<template>
  <Layout>
    <div class="page-wrapper red-line">
      <section class="hero is-large">
        <g-image class="hero-bg-img" src="~/assets/images/home-hero-image.jpg"/>
        <div class="hero-body">
          <div style="max-width: 80%;" class="container is-fullhd">
            <h1 class="hero-text title is-uppercase is-size-2 is-size-4-mobile" v-html="$page.homeData.heroTitle" />
          </div>

        </div>
      </section>

      <section class="section" style="max-width: 1200px; margin: 0 auto;">
        <div class="tile is-ancestor">
          <div class="tile">
            <div v-for="item in $page.homeData.indexCards" class="tile is-parent" style="flex-direction: column;">
              <div class="menu-card">
                <g-link :to="item.link">
                  <div class="card tile is-child">
                    <div class="card-image" style="padding: 20px;">
                      <figure class="image is-4by3">
                        <g-image class="img-hover-effect" :src="item.image"/>
                      </figure>
                    </div>
                    <div class="card-content has-text-centered">
                      <div class="content">
                        <div class="box is-size-4 is-size-5-mobile has-text-weight-bold explore-title">{{item.title}}</div>
                        {{item.text}}
                        <br><br>
                      </div>
                    </div>
                  </div>
                  <div style="display: flex; justify-content: center;" >
                    <button class="button is-primary">Explorar</button>
                  </div>
                </g-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="hero">
        <g-image class="hero-bg-img" src="~/assets/images/download-background.jpg"/>

        <div class="hero-body has-text-centered">

          <div style="max-width: 450px;" class="container">
            <a href="/files/libro_rojo_ecosistemas_terrestre.pdf" download>
              <p class="download-text is-size-6 is-size-7-mobile">Descarga el documento PDF (63 MB)&nbsp;&nbsp;
                <span class="is-size-3">&#10515;</span>
              </p>
            </a>
          </div>
        </div>
      </section>

    </div>
  </Layout>
</template>

<page-query>
  query Home {
    homeData: homeData (id: "home") {
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

  @import "~/assets/style/_variables";

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

  .img-hover-effect {
    transition: all ease 0.2s;
    //filter: grayscale(90%);
    opacity: 0.8;
  }

  .img-hover-effect:hover {
    //filter: grayscale(0%);
    opacity: 1;
  }

  .card {
    box-shadow: none;
  }

  .menu-card:hover {
    box-shadow: 0 2px 44px 0 rgba(0, 0, 0, 0.14);
  }

  .menu-card {
    box-shadow: none;
  }

  .explore-title {
    color: $primary;
  }

  .download-text {
    color: white;
    padding: 5px;
    border-radius: 10px;
    border: solid 2px white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>

<script>
  import InteractiveMap from '~/components/InteractiveMap.vue'

  export default {
    metaInfo: {
      title: 'Página principal'
    },
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
