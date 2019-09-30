<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-medium is-black">
        <g-image class="hero-bg-img" src="~/assets/images/home-hero-image.jpg"/>
        <div class="hero-body">
          <div class="container is-fullhd">
            <h1 class="title has-text-white" v-html="$page.homeData.heroTitle" />
            <h2 class="subtitle has-text-white"v-html="$page.homeData.heroSubTitle" />
          </div>
          <a href="#" v-scroll-to="'#mapSection'" style="border:none;" class="explore"><font-awesome size="lg" :icon="['fas', 'angle-double-down']"/></a>
        </div>
      </section>
      <section id="mapSection" class="section">
        <div class="map-title title has-text-centered is-uppercase">Formaciones Vegetales</div>
        <div class="has-text-centered">[Haz clic en una de las areas para ver la ficha de información]</div>
        <ClientOnly>
          <div style="height: 600px;">
            <l-map @leaflet:load="mapReady"
              ref="theMap"
              :zoom="zoom"
              :center="center"
              :maxBounds="maxBounds"
              :options="mapOptions"
              style="height: 100%"
            >
              <b-loading :is-full-page="isFullPage" :active.sync="isLoading"></b-loading>

              <l-tile-layer :url="url" :options="tileLayerOptions" />
              <l-geo-json ref="theSaxicolaLayer" :geojson="saxicolaLayer" :options="saxicolaLayerOptions" />
              <l-geo-json :geojson="vegetationLayer" :options="vegetationLayerOptions" />
            </l-map>
          </div>
        </ClientOnly>
        <div class="section container legend is-size-7 has-text-left">
          <div class="columns">
            <div v-for="i in 3" class="column">
              <div v-for="item in columnItems(i)">
                <g-link :to="makeLink(item)" v-if="item.legend === 'colorkey'"><span class="legend-item" :style="'background:' + item.color"></span> {{ item.name }}<br></g-link>
                <g-link v-else-if="item.legend === 'dotkey'" :to="makeLink(item)"><span class="dot" :style="'background:' + item.color"></span> {{ item.name }}<br></g-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="acercaDe" class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <h1 class="title is-uppercase">Explicación</h1>
          </div>
        </div>
        <div class="section">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
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
    opacity: 0.35;
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

  .legend {
    padding: 14px;
    border: 2px solid #BE1421;
  }

  .legend-item {
    height: 12px;
    width: 20px;
    display: inline-block;
  }

  .lightstripe {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1JyBoZWlnaHQ9JzUnPgogIDxyZWN0IHdpZHRoPSc1JyBoZWlnaHQ9JzUnIGZpbGw9J3doaXRlJy8+CiAgPHBhdGggZD0nTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVonIHN0cm9rZT0nIzg4OCcgc3Ryb2tlLXdpZHRoPScxJy8+Cjwvc3ZnPg==");
    background-repeat: repeat;
  }

  .dot {
    margin-left: 6px;
    margin-right: 6px;
    height: 8px;
    width: 8px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
  }

  .map-title {
    margin-bottom: 0;
  }

</style>

<script>
  import axios from 'axios';
  import slugify from 'slugify';

  var latLng, icon, circleMarker, latLngBounds;
  if (process.isClient) {
    icon = require('leaflet').Icon
    circleMarker = require('leaflet').circleMarker
    delete icon.Default.prototype._getIconUrl;
    icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
    latLng =  require('leaflet').latLng
    latLngBounds = require('leaflet').latLngBounds
  }

  export default {
    data() {
      let self = this
      return {
        isLoading: true,
        isFullPage: false,
        zoom: 6,
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        tileLayerOptions: {
          attribution: 'Tiles © Esri — Source: <a href="https://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">ArcGIS World Topographic Map</a>'
        },
        vegetationLayer: null,
        saxicolaLayer: null,
        mapOptions: {
          scrollWheelZoom: false,
          zoomSnap: 0.5
        },
        saxicolaLayerOptions: {
          onEachFeature: function onEachFeature(feature, layer) {
            let t = 'Vegetación saxícola'
            layer.bindPopup('<a href=' + self.makeLink(t) + '>' + t + '</a>')
          },
          pointToLayer: function(feature, latlng) {
            return circleMarker(latlng, {
              radius: 3,
              fillColor: "#333333",
              fillOpacity: 1,
              color: "#333333",
              weight: 1,
              opacity: 1
            })
          }
        },
        vegetationLayerOptions: {
          style: function(feature) {
            let a = self.$page.homeData.vegetation.find(function(v) { return v.name === feature.properties.T_VE})
            if (a) {
              return {
                weight: 1,
                fillOpacity: 0.6,
                color: a.color
              }
            }
          },
          attribution: 'Provita',
          onEachFeature: function onEachFeature(feature, layer) {
            let link = '<a href=' + self.makeLink(feature.properties.T_VE) + '>' + feature.properties.T_VE + '</a>'
            layer.bindPopup(link)

            //layer.bindPopup(feature.properties.T_VE)
            layer.on('popupopen', function() {
              layer.setStyle({
                weight: 3,
                fillOpacity: 1
              })
            })
            layer.on('popupclose', function() {
              layer.setStyle({
                weight: 1,
                fillOpacity: 0.6
              })
            })
          }
        }
      }
    },
    components: {
    },
    mounted () {
      axios.get('/mapdata/FormacionesVegetales.json').then((response) => {
        this.vegetationLayer = response.data;
        axios.get('/mapdata/Saxicola.json').then((response) => {
          this.isLoading = false;
          this.saxicolaLayer = response.data;
        })
      })
    },
    updated() {
      if (process.isClient) {
        let mb = latLngBounds(latLng(12.1623070337, -73.3049515449), latLng(0.724452215982, -59.7582848782))
        if (this.$refs.theMap) {
          this.$refs.theMap.fitBounds(mb)
        }
      }
    },
    computed: {
      center() {
        if (process.isClient) {
          return latLng(6.4238, -66.5897)
        }
      },
      maxBounds() {
        if (process.isClient) {
          return latLngBounds(latLng(12.1623070337, -73.3049515449), latLng(0.724452215982, -59.7582848782))
        }
      }
    },
    methods: {
      columnItems(g) {
        return(this.$page.homeData.vegetation.filter(function(v) { return v.group == g}))
      },
      makeLink(t) {
        let it
        if (typeof t === 'string') {
          it = this.$page.homeData.vegetation.find(function(v) { return v.name === t})
        } else {
          it = t
        }
        if (it.cardPath){
          return 'vcards/' + slugify(it.cardPath, {lower: true})
        } else {
          return 'vcards/' + slugify(it.name, {lower: true})
        }
      },
      mapReady() {
        //console.log('Map is ready');
        //console.log(this.$refs.theMap.mapObject);
        //this.isLoading = false;
      }
    }
  }
</script>
