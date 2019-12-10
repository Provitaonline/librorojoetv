<template>
  <div>
    <div id="mapSection" class="section-header map-title box">
      <div class="is-size-3 is-size-4-mobile has-text-weight-bold has-text-centered" v-html="mapTitle"></div>
      <div class="has-text-centered">[Haz clic en una de las áreas para ver la ficha de información]</div>
    </div>
    <div style="height: 800px;">
      <ClientOnly>
        <l-map @leaflet:load="mapReady"
          ref="theMap"
          :maxBounds="maxBounds"
          :bounds="initialBounds"
          :options="mapOptions"
          :minZoom="minZoom"
          :zoomAnimation="zoomAnimation"
          style="height: 100%"
          @update:zoom="zoomUpdated"
        >
          <l-control-zoom zoomInTitle="Acercarse" zoomOutTitle="Alejarse" position="topleft"></l-control-zoom>
          <l-control class="leaflet-control leaflet-bar" position="topleft" >
            <a @click="resetView" href="#" title="Vista inicial"><font-awesome size="lg" :icon="['fas', 'sync-alt']"/></a>
          </l-control>
          <l-control class="leaflet-control transparency-control" v-bind:class="{'is-touch': isTouch}" @ready="tcReady" position="topleft" >
              <div title="Ajuste de transparencia">
                <b-tooltip class="tc-tooltip" type="is-white" :style="ttStyle" :label="layerTransparency + '%'" position="is-right">
                  <input id="transparencySlider" class="slider" step="1" min="0" max="100" :value="layerTransparency" type="range" orient="vertical">
                </b-tooltip>
              </div>
            <!-- <b-field class="transparency-control" label="Ajuste de transparencia">
              <b-slider v-model="layerTransparency" :custom-formatter="val => val + '%'" type="is-light" rounded></b-slider>
            </b-field> -->
          </l-control>
          <l-control-layers position="topleft"  ></l-control-layers>
          <l-tile-layer
            ref="tileLayerReference"
            v-for="tileProvider in tileProviders"
            @add="tileLayerAdded"
            :key="tileProvider.name"
            :name="tileProvider.name"
            :visible="tileProvider.visible"
            :url="tileProvider.url"
            :attribution="tileProvider.attribution"
            :options="tileProvider.options"
            layer-type="base"/>

          <l-geo-json v-for="(item, index) in geoJsonResources" v-bind:key="item.url" ref="layerReference" :geojson="$options.geoJsonLayers[index]" :options="$options.geoJsonLayerOptions[index]" />

          <l-marker :options="{interactive: false}" :lat-lng="[10.5418, -66.9067]">
            <l-icon>
              <div v-show="!hideLabels" class="map-label map-city-label">Caracas</div>
            </l-icon>
          </l-marker>

          <l-marker :options="{interactive: false}" :lat-lng="[11.2430, -66.2255]">
            <l-icon>
              <div class="map-label map-ocean-label">Mar&nbsp;Caribe</div>
            </l-icon>
          </l-marker>

          <l-control position="topright" >
            <div class="map-info is-size-4 is-size-7-mobile"><div>{{mapLabel}}</div></div>
          </l-control>

          <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
        </l-map>
      </ClientOnly>
    </div>
    <div class="legend is-size-6 has-text-left">
      <div class="columns">
        <div v-for="i in numberOfLegendGroups" class="column">
          <div v-for="item in columnItems(i)">
            <div :id="makeId(item.name)" class="legend-box">
              <div title="Clic para sólo ver esto en el mapa" v-if="item.legend === 'colorkey'" @click="legendClick(item)" class="legend-symbol"><span class="legend-item" :style="'background:' + item.color + ';'"></span></div>
              <div title="Clic para sólo ver esto en el mapa" v-else-if="item.legend === 'dotkey'" @click="legendClick(item)" class="legend-symbol"><span class="dot" :style="'background:' + item.color + ';'"></span></div>
              <div v-if="item.isIndented" @click="legendClick(item)" class="legend-symbol"><span class="legend-empty"></span></div>
              <g-link title="Clic para ir a los detalles" :to="makeLink(item)"><span v-html="makeLabel(item)"></span></g-link>
            </div>
          </div>
          <div v-if="i === numberOfLegendGroups" style="display: flex;">
            <div>&nbsp;</div>
          </div>
          <div v-if="i === numberOfLegendGroups" style="display: flex;">
            <div title="Clic para ver todo en el mapa" @click="legendClick({name: 'all'})" class="legend-symbol"><span class="legend-item" :style="'background: #f8e7e8;'"></span></div>
            <div> <font-awesome size="sm" :icon="['fas', 'arrow-left']"/><i> Clic para ver todas</i></div>
          </div>
        </div>
      </div>
      <div class="has-text-centered">[Haz clic en uno de los títulos de la leyenda para ver la ficha de información]</div>
      <div class="has-text-centered">[Haz clic en uno de los elementos de color para ver sólo ese en el mapa]</div>
    </div>
  </div>
</template>

<static-query>

</static-query>

<style lang="scss" scoped>

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

  .legend-item:hover, .dot:hover, .legend-empty:hover {
    border: 2px solid #BE1421;
  }

  .legend-box {
    display: flex;
    box-sizing: border-box;
  }

  .legend-symbol-empty {
    box-sizing:
    border-box;
    padding-right: 10px;
  }

  .legend-empty {
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
    max-width: 65vw;
    background: #f8e7e8;
  }

  .map-info div {
    margin: 10px;
  }

  .map-info div:empty {
    display: none;
  }

  .map-city-label {

  }

  .map-ocean-label {
    color: #2D60AB;
    font-style: italic;
  }

  @media only screen and (max-width: 600px) {
    ::v-deep .transparency-control {
      margin-bottom: 28px;
    }
  }

  @media only screen and (max-width: 400px) {
    ::v-deep .transparency-control {
      margin-bottom: 42px;
    }
  }

  .transparency-control {
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0,0,0,0.65);
    width: 26px;
    margin-bottom: 0px;
  }

  .transparency-control .slider {
    height: 80px;
    width: 20px;
    margin-top: 8px;
    margin-bottom: 8px;
    margin-left: 3px;
  }

  .transparency-control.is-touch {
    border: 2px solid rgba(0,0,0,0.2);
    box-sizing: border-box;
    box-shadow: none;
    background-clip: padding-box;
    width: 34px;
  }

  .transparency-control.is-touch .slider {
    margin-left: 5px;
  }

  ::v-deep .tc-tooltip {
    &::after, &::before {
      top: var(--ttpos);
      margin-left: 5px;
      font-size: .75rem;
    }
  }

</style>

<style lang="scss">
  .legend-heading {
    font-weight: 600 !important;
    text-decoration: underline !important;
    text-decoration-color: #BE1421 !important;
  }
</style>

<script>
  import axios from 'axios'
  import slugify from 'slugify'
  import * as topojson from 'topojson-client'

  //import bulmaSlider from 'bulma-slider/dist/js/bulma-slider.min.js'

  slugify.extend({'/': '-'})

  var latLng, icon, circleMarker, lBrowser;
  if (process.isClient) {
    icon = require('leaflet').Icon
    circleMarker = require('leaflet').circleMarker
    lBrowser = require('leaflet').Browser
    delete icon.Default.prototype._getIconUrl;
    icon.Default.mergeOptions({
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
    latLng =  require('leaflet').latLng
  }

  function displaySelectedFeature(layerGroup, name, opacity, property) {
    layerGroup.eachLayer(function (layer) {
      if (matchFeatureProperty(layer.feature.properties[property], name) || name === 'all') {
        layer.setStyle({fillOpacity: opacity, opacity: opacity})
      } else {
        layer.setStyle({fillOpacity: 0, opacity: 0})
      }
    })
  }

  function matchFeatureProperty(property, name) {
    return isNaN(property) ? property.includes(name) : property === name
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

  async function getLayers(t, geoJsonResources) {
    for (let [i, l] of geoJsonResources.entries()) {
      let response = await axios.get(l.url)
      if (l.isTopoJson) {
        t.$options.geoJsonLayers[i] = topojson.feature(response.data, response.data.objects[l.topoJsonObject])
      } else {
        t.$options.geoJsonLayers[i] = response.data
      }
    }
    t.isLoading = false
  }

  function makeGeoJsonLayerOptions(makeLink, legendItems, geoJsonResource, makeMapPopupLabel, layerTransparency) {
    let geoJsonLayerOptions = {}
    let a
    let opacity = 1 - layerTransparency/100
    if (geoJsonResource.makePointsToCircles) {
      geoJsonLayerOptions.pointToLayer = function(feature, latlng) {
        a = legendItems.find(function(v) { return v.name === feature.properties[geoJsonResource.legendTitleProperty]})
        return circleMarker(latlng, {
          radius: 2,
          fillColor: a.color,
          fillOpacity: opacity,
          color: a.color,
          weight: 1,
          opacity: 1
        })
      }
    } else {
      geoJsonLayerOptions.style = function(feature) {
        a = legendItems.find(function(v) { return v.name === feature.properties[geoJsonResource.legendTitleProperty]})
        if (a) {
          return {
            weight: geoJsonResource.showOutline ? 2 : 0,
            fillOpacity: opacity,
            fillColor: a.color,
            opacity: opacity,
            dashArray: '6,4',
            color: '#444444'
          }
        }
      }
    }

    geoJsonLayerOptions.attribution = 'Provita, Huber y Oliveira-Miranda (2010)'

    geoJsonLayerOptions.onEachFeature = function onEachFeature(feature, layer) {
      let link = '<a href=' + makeLink(feature.properties[geoJsonResource.legendTitleProperty]) + '>' + makeMapPopupLabel(feature.properties[geoJsonResource.legendTitleProperty], geoJsonResource.isLegendLookUp) + '</a>'
      layer.bindPopup(link)
      if (geoJsonResource.showOutline) {
        layer.on('mouseover', function(e) {
          layer.setStyle({weight: 3, color: '#000', dashArray: ''})
        })
        layer.on('mouseout', function(e) {
          layer.setStyle({weight: 2, color: '#444444', dashArray: '6,4'})
        })
      }
    }

    return geoJsonLayerOptions
  }
  export default {
    name: 'InteractiveMap',
    props: {
      legendItems: { type: Array, required: true },
      geoJsonResources: { type: Array, required: true },
      mapTitle: { type: String, required: true },
      initialLayerTransparency: { type: Number, required: false },
      initialTileProvider: { type: Number, required: false }
    },
    data() {
      return {
        isLoading: true,
        zoomAnimation: true,
        mapLabel: '',
        mapLabelLookupKey: '',
        hideLabels: false,
        zoom: 7,
        minZoom: 5,
        initialBounds: [[13, -73], [0.6, -59]],
        maxBounds: [[13, -74], [0.5, -58]],
        center: [6.42, -66.59 ],
        layerTransparency: (this.initialLayerTransparency ? this.initialLayerTransparency : 5),
        ttStyle: {
          '--ttpos': '90%'
        },
        isTouch: true,
        tileProviders: [
          {
            name: 'Mapa base simple',
            visible: false,
            attribution: 'Tiles © Esri — Source: <a href="https://www.arcgis.com/home/item.html?id=c61ad8ab017d49e1a82f580ee1298931">ArcGIS World Terrain Base</a>',
            options: {
              maxNativeZoom: 9
            },
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}'
          },
          {
            name: 'Mapa base topográfico',
            visible: false,
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            attribution: 'Tiles © Esri — Source: <a href="https://www.arcgis.com/home/item.html?id=30e5fe3149c34df1ba922e6f5bbf808f">ArcGIS World Topographic Map</a>',
            hideLabels: true
          },
          {
            name: 'National Geographic',
            visible: false,
            url: 'https://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
            attribution: 'Tiles © Esri — Source: <a href="https://www.arcgis.com/home/item.html?id=b9b1b422198944fbbd5250b3241691b6">National Geographic World Map</a>',
            hideLabels: true
          },
          {
            name: 'OpenStreetMap',
            visible: false,
            url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            hideLabels: true
          },
          {
            name: 'Imágenes aéreas/satelitales',
            visible: false,
            url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attribution: 'Tiles © Esri — Source: <a href="http://www.arcgis.com/home/item.html?id=10df2279f9684e4a9f6a7f08febac2a9">ArcGIS World Imagery</a>'
          }
        ],
        //url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        //url: "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
        //url: "https://services.arcgisonline.com/arcgis/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        mapOptions: {
          scrollWheelZoom: false,
          markerZoomAnimation: false,
          //zoomDelta: 0.2,
          zoomSnap: 0.1,
          zoomControl: false
        }
      }
    },
    components: {
    },
    beforeCreate() {
      this.$options.geoJsonLayers = (new Array(this.$options.propsData.geoJsonResources.length)).fill(null)
      this.$options.geoJsonLayerOptions = (new Array(this.$options.propsData.geoJsonResources.length)).fill(null)
      //this.$options.propsData.tileProviders[1].visible = true
    },
    created() {
      this.tileProviders[(this.initialTileProvider ? this.initialTileProvider : 0)].visible = true
    },
    mounted () {
      if (process.isClient) {
        this.geoJsonResources.forEach((r, i) => {
          if (r.geoJsonLayerOptions) {
            this.$options.geoJsonLayerOptions[i] = r.geoJsonLayerOptions
          } else {
            this.$options.geoJsonLayerOptions[i] = makeGeoJsonLayerOptions(this.makeLink, this.legendItems, r, this.makeMapPopupLabel, this.layerTransparency)
          }
        })
        getLayers(this, this.geoJsonResources)
      }
    },
    updated() {

    },
    computed: {
      numberOfLegendGroups() {
        return Math.max.apply(Math, this.$options.propsData.legendItems.map(function(el) { return el.group; }))
      }
    },
    methods: {
      columnItems(g) {
        return(this.legendItems.filter(function(v) { return v.group == g}))
      },
      makeLink(t) {
        let it
        if (typeof t === 'string') {
          it = this.legendItems.find(function(v) { return v.name === t})
        } else {
          it = t
        }
        if (it.cardPath) {
          let target = it.cardPath.includes('#') ? it.cardPath : slugify(it.cardPath, {lower: true})
          return this.$route.path.replace(/\/$/, "") + '/' + target
        } else {
          return this.$route.path.replace(/\/$/, "") + '/' + slugify(it.name, {lower: true})
        }
      },
      makeLabel(t) {
        let label = t.label ? t.label : t.name
        if (t.isHeading) label = '<span class="legend-heading">' + label + '</span>'
        return label
      },
      makeId(t) {
        return(slugify(t, {lower: true}))
      },
      makeMapPopupLabel(name, isLegendLookUp) {
        if (isLegendLookUp) {
          let r = this.$options.propsData.legendItems.find(el => el.name === name)
          return (r && r.label) ? r.label : name
        } else {
          return name
        }
      },
      mapReady() {
      },
      tcReady() {
        this.isTouch = lBrowser.touch
        let self = this
        this.ttStyle['--ttpos'] = 0.8*(110 - this.layerTransparency) + '%'
        document.getElementById('transparencySlider').addEventListener('input', function(e) {
          self.layerTransparency = e.target.value
          self.ttStyle['--ttpos'] = 0.8*(110 - e.target.value) + '%'
        })
      },
      tileLayerAdded(e) {
        this.hideLabels = this.tileProviders.find(p => p.url === e.target._url).hideLabels ? true : false
      },
      zoomUpdated(zoom) {
        let elements = document.getElementsByClassName('map-label')
        Array.from(elements).forEach(function (element) {
          element.setAttribute('style', 'font-size:' +  (zoom/8) * 1.25 + 'rem; margin-left: -2rem;' + ' display: '  + element.style.display + ';')
        })
      },
      resetView() {
        this.$refs.theMap.mapObject.fitBounds(this. initialBounds)
      },
      legendClick(item) {
        let isLegendLookUp = false
        this.geoJsonResources.forEach((r, i) => {
          if (r.legendTitleProperty) {
            if (!isLegendLookUp) {
              if (r.isLegendLookUp) {
                isLegendLookUp = true
              }
            }
            displaySelectedFeature(this.$refs.layerReference[i].mapObject, item.name, 1 - this.layerTransparency/100, r.legendTitleProperty)
          }
        })

        Array.from(document.getElementsByClassName('legend-box')).forEach(function (element) {
          element.setAttribute('style', 'background: none;')
        })

        if (item.name != 'all') {
          this.mapLabel = this.makeMapPopupLabel(item.name, isLegendLookUp)
          if (isLegendLookUp) this.mapLabelLookupKey = item.name
          document.getElementById(this.makeId(item.name)).setAttribute('style', 'background: #f8e7e8;')
        } else {
          this.mapLabel = ''
        }

      }
    },
    watch: {
      layerTransparency: function() {
        let opacity = 1 - this.layerTransparency/100
        this.geoJsonResources.forEach((r, i) => {
          if (r.legendTitleProperty) {
            this.$refs.layerReference[i].mapObject.eachLayer((layer) => {
              if (this.mapLabel != '') {
                if (r.isLegendLookUp && matchFeatureProperty(layer.feature.properties[r.legendTitleProperty], this.mapLabelLookupKey) ||
                  this.mapLabel === layer.feature.properties[r.legendTitleProperty]) {
                  layer.setStyle({fillOpacity: opacity, opacity: opacity})
                }
              } else {
                layer.setStyle({fillOpacity: opacity, opacity: opacity})
              }
            })
          }
        })
      }
    }
  }
</script>
