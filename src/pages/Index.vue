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
        <div id="mapSection" class="section-header map-title box">
          <div class="is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered">Formaciones Vegetales de Venezuela - 2010</div>
          <div class="has-text-centered">[Haz clic en una de las áreas para ver la ficha de información]</div>
        </div>
        <div style="height: 800px;">
          <ClientOnly>
            <l-map @leaflet:load="mapReady"
              ref="theMap"
              :maxBounds="maxBounds"
              :bounds="initialBounds"
              :options="mapOptions"
              :zoom="zoom"
              :minZoom="minZoom"
              style="height: 100%"
              @update:zoom="zoomUpdated"
            >
              <l-control-zoom zoomInTitle="Acercarse" zoomOutTitle="Alejarse" position="topleft"></l-control-zoom>
              <l-control class="leaflet-control leaflet-bar" position="topleft" >
                <a @click="resetView" href="#" title="Vista inicial"><font-awesome size="lg" :icon="['fas', 'sync-alt']"/></a>
              </l-control>
              <l-control-layers position="topleft"  ></l-control-layers>
              <l-tile-layer @load="tileLayerReady" :url="url" :options="tileLayerOptions" />
              <l-tile-layer
                v-for="tileProvider in tileProviders"
                @load="tileLayerReady"
                :key="tileProvider.name"
                :name="tileProvider.name"
                :visible="tileProvider.visible"
                :url="tileProvider.url"
                :attribution="tileProvider.attribution"
                layer-type="base"/>
              <l-geo-json :geojson="venezuelaLayer" :options="venezuelaLayerOptions" />
              <l-geo-json ref="saxicolaLayer" :geojson="saxicolaLayer" :options="saxicolaLayerOptions" />
              <l-geo-json ref="vegetationLayer" :geojson="vegetationLayer" :options="vegetationLayerOptions" />

              <l-marker :options="{interactive: false}" :lat-lng="[10.5418, -66.9067]">
                <l-icon>
                  <div class="map-label map-city-label">Caracas</div>
                </l-icon>
              </l-marker>

              <l-marker :options="{interactive: false}" :lat-lng="[11.2430, -66.2255]">
                <l-icon>
                  <div class="map-label map-ocean-label">Mar&nbsp;Caribe</div>
                </l-icon>
              </l-marker>

              <l-control position="topright" >
                <div class="map-info is-size-4 is-size-7-mobile"><span>{{mapLabel}}</span></div>
              </l-control>

              <l-control position="bottomleft" >
                <b-field class="transparency-control" label="Ajuste de transparencia">
                  <b-slider v-model="layerTransparency" :custom-formatter="val => val + '%'" type="is-light" rounded></b-slider>
                </b-field>
              </l-control>

              <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
            </l-map>
          </ClientOnly>
        </div>
        <div class="legend is-size-6 has-text-left">
          <div class="columns">
            <div v-for="i in 3" class="column">
              <div v-for="item in columnItems(i)">
                <div :id="makeId(item.name)" class="legend-box">
                  <div title="Clic para sólo ver esto en el mapa" v-if="item.legend === 'colorkey'" @click="legendClick(item)" class="legend-symbol"><span class="legend-item" :style="'background:' + item.color + ';'"></span></div>
                  <div title="Clic para sólo ver esto en el mapa" v-else-if="item.legend === 'dotkey'" @click="legendClick(item)" class="legend-symbol"><span class="dot" :style="'background:' + item.color + ';'"></span></div>
                  <g-link title="Clic para ir a los detalles" :to="makeLink(item)"> {{ item.name }}</g-link>
                </div>
              </div>
              <div v-if="i === 3" style="display: flex;">
                <div>&nbsp;</div>
              </div>
              <div v-if="i === 3" style="display: flex;">
                <div title="Clic para ver todo en el mapa" @click="legendClick({name: 'all'})" class="legend-symbol"><span class="legend-item" :style="'background: #f8e7e8;'"></span></div>
                <div> <font-awesome size="sm" :icon="['fas', 'arrow-left']"/><i> Clic para ver todas</i></div>
              </div>
            </div>
          </div>
          <div class="has-text-centered">[Haz clic en uno de los títulos de la leyenda para ver la ficha de información]</div>
          <div class="has-text-centered">[Haz clic en uno de los elementos de color para ver sólo esa formación]</div>
        </div>
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

  .legend {
    padding: 14px;
    border: 2px solid #BE1421;
  }

  .legend-item {
    height: 12px;
    width: 20px;
    display: inline-block;
  }

  .legend-symbol {
    cursor: pointer;
    box-sizing:
    border-box;
    padding-right: 10px;
  }

  .legend-item:hover, .dot:hover {
    border: 2px solid #BE1421;
  }

  .legend-box {
    display: flex;
    box-sizing:
    border-box;
  }

  .lightstripe {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc1JyBoZWlnaHQ9JzUnPgogIDxyZWN0IHdpZHRoPSc1JyBoZWlnaHQ9JzUnIGZpbGw9J3doaXRlJy8+CiAgPHBhdGggZD0nTTAgNUw1IDBaTTYgNEw0IDZaTS0xIDFMMSAtMVonIHN0cm9rZT0nIzg4OCcgc3Ryb2tlLXdpZHRoPScxJy8+Cjwvc3ZnPg==");
    background-repeat: repeat;
  }

  .dot {
    margin-left: 6px;
    margin-right: 2px;
    height: 12px;
    width: 12px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
  }

  .map-title {
    margin-bottom: 0;
    padding-bottom: 4px;
  }

  .map-info {
    background: #f8e7e8;
  }

  .map-info span {
    margin: 10px;
  }

  .map-info span:empty {
    display: none;
  }

  .map-city-label {

  }

  .map-ocean-label {
    color: #2D60AB;
    font-style: italic;
  }

  ::v-deep .transparency-control label {
    font-size: 0.9rem;
    font-weight: 400;
  }

</style>

<script>
  import axios from 'axios';
  import slugify from 'slugify';
  import * as topojson from 'topojson-client'

  var latLng, icon, circleMarker;
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
  }

  function displaySelectedFeature(layerGroup, name, property, opacity) {
    layerGroup.eachLayer(function (layer) {
      if (name === layer.feature.properties[property] || name === 'all') {
        layer.setStyle({fillOpacity: opacity})
      } else {
        layer.setStyle({fillOpacity: 0})
      }
    })
  }

  function displayLayer(layerGroup) {
    layerGroup.eachLayer(function (layer) {
      layer.setStyle({fillOpacity: 1, opacity: 1})
    })
  }

  function hideLayer(layerGroup) {
    layerGroup.eachLayer(function (layer) {
      layer.setStyle({fillOpacity: 0, opacity: 0})
    })
  }

  async function getLayers(dataObject, geoJsonLayers) {
    let response
    //geoJsonLayers.forEach(function(l) {
    for (let l of geoJsonLayers) {
      response = await axios.get(l.url)
      if (l.isTopoJson) {
        dataObject[l.targetDataItem] = topojson.feature(response.data, response.data.objects[l.topoJsonObject])
      } else {
        dataObject[l.targetDataItem] = response.data
      }
    }
    dataObject.isLoading = false
  }

  export default {
    data() {
      let self = this
      return {
        isLoading: true,
        mapLabel: '',
        zoom: 7,
        minZoom: 5,
        initialBounds: [[13, -73], [0.6, -59]],
        maxBounds: [[13, -74], [0.5, -58]],
        center: [6.42, -66.59 ],
        layerTransparency: 5,
        tileProviders: [
          {
            name: 'Mapa base simple',
            visible: true,
            attribution: 'Tiles © Esri — Source: <a href="https://www.arcgis.com/home/item.html?id=c61ad8ab017d49e1a82f580ee1298931">ArcGIS World Terrain Base</a>',
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'
          },
          {
            name: 'Mapa base topográfico',
            visible: false,
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            attribution: 'Tiles © Esri — Source: <a href="https://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">ArcGIS World Topographic Map</a>'
          },
          {
            name: 'Imágenes aéreas/satelitales',
            visible: false,
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: 'Tiles © Esri — Source: <a href="http://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">ArcGIS World Imagery</a>'
          }
        ],
        //url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
        //url: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
        //url: "https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        tileLayerOptions: {
          //attribution: 'Tiles © Esri — Source: <a href="https://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">ArcGIS World Topographic Map</a>',
          attribution: 'Tiles © Esri — Source: <a href="https://www.arcgis.com/home/item.html?id=c61ad8ab017d49e1a82f580ee1298931">ArcGIS World Terrain Base</a>',
          maxNativeZoom: 9
        },
        vegetationLayer: null,
        saxicolaLayer: null,
        venezuelaLayer: null,
        mapOptions: {
          scrollWheelZoom: false,
          markerZoomAnimation: false,
          //zoomDelta: 0.2,
          zoomSnap: 0.1,
          zoomControl: false
        },
        venezuelaLayerOptions: {
          style: function(feature) {
            if (feature.properties.T_VE === 'Cuerpos de agua') {
              return {
                weight: 0,
                opacity: 0,
                fillOpacity: 1,
                fillColor: '#BDE6E0',
                interactive: false
              }
            } else {
              return {
                weight: 1,
                color: '#504f54',
                dashArray: '2,3',
                opacity: 1,
                fillOpacity: 0,
                interactive: false
              }
            }
          }
        },
        saxicolaLayerOptions: {
          onEachFeature: function onEachFeature(feature, layer) {
            let t = 'Vegetación saxícola'
            layer.bindPopup('<a href=' + self.makeLink(t) + '>' + t + '</a>')
          },
          pointToLayer: function(feature, latlng) {
            return circleMarker(latlng, {
              radius: 2,
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
                weight: 0,
                fillOpacity: 0.95,
                color: a.color
              }
            }
          },
          attribution: '| Provita, Huber y Oliveira-Miranda (2010)',
          onEachFeature: function onEachFeature(feature, layer) {
            let link = '<a href=' + self.makeLink(feature.properties.T_VE) + '>' + feature.properties.T_VE + '</a>'
            layer.bindPopup(link)

            layer.on('popupopen', function() {
              layer.setStyle({
                weight: 1,
                fillOpacity: 1
              })
            })
            layer.on('popupclose', function() {
              layer.setStyle({
                weight: 0,
                fillOpacity: 0.95
              })
            })
          }
        }
      }
    },
    components: {
    },
    created() {

    },
    mounted () {
      let geoJsonLayers = [
        {
          url: '/mapdata/FormacionesVegetales.topojson',
          isTopoJson: true,
          targetDataItem: 'vegetationLayer',
          topoJsonObject: 'FormacionesVegetales'
        },
        {
          url: '/mapdata/VenezuelaNoStates.topojson',
          isTopoJson: true,
          targetDataItem: 'venezuelaLayer',
          topoJsonObject: 'VenezuelaNoStates'
        },
        {
          url: '/mapdata/Saxicola.json',
          targetDataItem: 'saxicolaLayer'
        }
      ]
      getLayers(this, geoJsonLayers)
    },
    updated() {

    },
    computed: {

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
      makeId(t) {
        return(slugify(t, {lower: true}))
      },
      mapReady() {

      },
      tileLayerReady() {

      },
      zoomUpdated(zoom) {
        let elements = document.getElementsByClassName('map-label')
        Array.from(elements).forEach(function (element) {
          element.setAttribute('style', 'font-size:' +  (zoom/8) * 1.25 + 'rem; margin-left: -2rem')
        })
      },
      resetView() {
        this.$refs.theMap.mapObject.fitBounds(this. initialBounds)
      },
      legendClick(item) {
        displaySelectedFeature(this.$refs.vegetationLayer.mapObject, item.name, 'T_VE', 1 - this.layerTransparency/100)
        if (item.name === 'Vegetación saxícola' || item.name === 'all') {
          displayLayer(this.$refs.saxicolaLayer.mapObject)
        } else {
          hideLayer(this.$refs.saxicolaLayer.mapObject)
        }

        Array.from(document.getElementsByClassName('legend-box')).forEach(function (element) {
          element.setAttribute('style', 'background: none;')
        })

        if (item.name != 'all') {
          this.mapLabel = item.name
          document.getElementById(this.makeId(item.name)).setAttribute('style', 'background: #f8e7e8;')
        } else {
          this.mapLabel = ''
        }

      }
    },
    watch: {
      layerTransparency: function() {
        this.$refs.vegetationLayer.mapObject.eachLayer((layer) => {
          if (this.mapLabel != '') {
            if (this.mapLabel === layer.feature.properties.T_VE) {
              layer.setStyle({fillOpacity: 1 - this.layerTransparency/100})
            }
          } else {
            layer.setStyle({fillOpacity: 1 - this.layerTransparency/100})
          }
        })
      }
    }
  }
</script>
