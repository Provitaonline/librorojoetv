<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-medium is-black">
        <img class="hero-bg-img" src="/uploads/home-hero-image.png" srcset=""></img>
        <div class="hero-body">
          <div class="container is-fullhd">
            <h1 class="title has-text-white" v-html="$page.homeData.heroTitle" />
            <h2 class="subtitle has-text-white"v-html="$page.homeData.heroSubTitle" />
          </div>
          <a href="#" v-scroll-to="'#mapSection'" style="border:none;" class="button explore is-primary is-inverted is-outlined"><font-awesome size="lg" :icon="['fas', 'angle-double-down']"/></a>
        </div>
      </section>
      <section id="mapSection" class="section">
        <div class="map-title has-text-centered">
          <b>FORMACIONES VEGETALES DE VENEZUELA - 2010</b>
        </div>
        <ClientOnly>
          <div class="container" style="height: 600px;">
            <l-map
              ref="myMap"
              :zoom="zoom"
              :center="center"
              :maxBounds="maxBounds"
              :options="mapOptions"
              style="height: 100%"
            >
              <l-tile-layer :url="url" />
              <l-geo-json ref="myGeoJson" :geojson="geojson" :options="options">
              </l-geo-json>
            </l-map>
          </div>
        </ClientOnly>
        <div class="section container legend is-size-7 has-text-left">
          <div class="columns">
            <div class="column">
              <div v-for="item in columnOneItems">
                <g-link v-if="item.legend === 'colorkey'"><span class="legend-item" :style="'background:' + item.color"></span> {{ item.name }}<br></g-link>
                <g-link v-else-if="item.legend === 'stripes'"><span class="legend-item lightstripe"></span> {{ item.name }}<br></g-link>
                <g-link v-else-if="item.legend === 'dotkey'"><span class="dot" :style="'background:' + item.color"></span> {{ item.name }}<br></g-link>
              </div>
            </div>
            <div class="column">
              <div v-for="item in columnTwoItems">
                <g-link v-if="item.legend === 'colorkey'"><span class="legend-item" :style="'background:' + item.color"></span> {{ item.name }}<br></g-link>
                <g-link v-else-if="item.legend === 'stripes'"><span class="legend-item lightstripe"></span> {{ item.name }}<br></g-link>
                <g-link v-else-if="item.legend === 'dotkey'"><span class="dot" :style="'background:' + item.color"></span> {{ item.name }}<br></g-link>
              </div>
            </div>
            <div class="column">
              <div v-for="item in columnThreeItems">
                <g-link v-if="item.legend === 'colorkey'"><span class="legend-item" :style="'background:' + item.color"></span> {{ item.name }}<br></g-link>
                <g-link v-else-if="item.legend === 'stripes'"><span class="legend-item lightstripe"></span> {{ item.name }}<br></g-link>
                <g-link v-else-if="item.legend === 'dotkey'"><span class="dot" :style="'background:' + item.color"></span> {{ item.name }}<br></g-link>
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
    	vegetation {
        name
        group
        color
        legend
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
    transform: translate(-50%, 0);
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
</style>

<script>
  import axios from 'axios';

  var latLng, Icon, latLngBounds;
  if (process.isClient) {
    Icon = require('leaflet').Icon
    delete Icon.Default.prototype._getIconUrl;
    Icon.Default.mergeOptions({
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
        zoom: 6,
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        geojson: null,
        mapOptions: {
          zoomSnap: 0.5
        },
        options: {
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
          onEachFeature: function onEachFeature(feature, layer) {
            layer.bindPopup(feature.properties.T_VE)
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
    mounted () {
      //console.log(this.maxBounds)
      //this.$refs.myMap.mapObject.fitBounds(maxbounds())
      axios.get('/mapdata/FormacionesVegetales.geojson').then((response) => {
        this.geojson = response.data;
      })
    },
    updated() {
      //console.log(this.geojson)
      if (process.isClient) {
        let mb = latLngBounds(latLng(12.1623070337, -73.3049515449), latLng(0.724452215982, -59.7582848782))
        if (this.$refs.myMap) {
          this.$refs.myMap.fitBounds(mb)
        }
      }
    },
    computed: {
      columnOneItems() {
        return(this.$page.homeData.vegetation.filter(function(v) { return v.group == 1}))
      },
      columnTwoItems() {
        return(this.$page.homeData.vegetation.filter(function(v) { return v.group == 2}))
      },
      columnThreeItems() {
        return(this.$page.homeData.vegetation.filter(function(v) { return v.group == 3}))
      },
      center() {
        if (process.isClient) {
          return latLng(6.4238, -66.5897)
        }
      },
      maxBounds() {
        //return latLngBounds(latLng(0.724452215982, -73.3049515449), latLng(12.1623070337, -59.7582848782))
        if (process.isClient) {
          return latLngBounds(latLng(12.1623070337, -73.3049515449), latLng(0.724452215982, -59.7582848782))
        }
      }
    }
  }
</script>
