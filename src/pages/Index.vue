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
          <a class="button explore is-primary is-inverted is-outlined"><font-awesome size="lg" :icon="['fas', 'angle-double-down']"/></a>
        </div>
      </section>
      <section class="section">
        <div class="map-title has-text-centered">
          <b>FORMACIONES VEGETALES DE VENEZUELA - 2010</b>
        </div>
        <div class="container" style="height: 600px;">
          <l-map
            ref="myMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 100%"
          >
            <l-tile-layer :url="url" />
          </l-map>
        </div>
        <div class="section container legend is-size-7 has-text-left">
          <div class="columns">
            <div class="column">
              <g-link><span class="legend-item" style="background: #1f743a;"></span> Bosques siempreverdes per se<br></g-link>
              <g-link><span class="legend-item" style="background: #6cbd45;"></span> Bosques nublados<br></g-link>
              <g-link><span class="legend-item" style="background: #75b374;"></span> Bosques de palmas<br></g-link>
              <g-link><span class="legend-item" style="background: #5fbb46;"></span> Bosques de pantano<br></g-link>
              <g-link><span class="legend-item" style="background: #5b8a45;"></span> Bosques de manglares<br></g-link>
              <g-link><span class="legend-item" style="background: #7bc46c;"></span> Bosques semideciduos<br></g-link>
              <g-link><span class="legend-item" style="background: #b0d136;"></span> Bosques deciduos<br></g-link>
              <g-link><span class="legend-item" style="background: #aaab37;"></span> Bosques ribereños</g-link>
            </div>
            <div class="column">
              <g-link><span class="legend-item" style="background: #cba865;"></span> Arbustales siempreverdes per se<br></g-link>
              <g-link><span class="legend-item" style="background: #a83b23;"></span> Arbustales tepuyanos<br></g-link>
              <g-link><span class="legend-item" style="background: #f2633e;"></span> Arbustales espinosos<br></g-link>
              <g-link><span class="legend-item" style="background: #f8a67f;"></span> Arbustales litorales<br></g-link>
              <g-link><span class="legend-item" style="background: #a77129;"></span> Arbustales ribereños<br></g-link>
              <g-link><span class="legend-item" style="background: #e6b620;"></span> Arbustales y herbazales parameros<br></g-link>
              <g-link><span class="legend-item" style="background: #ffd27f;"></span> Sabanas abiertas<br></g-link>
              <g-link><span class="legend-item" style="background: #fca91c;"></span> Sabanas arbustivas y/o arboladas</g-link>
            </div>
            <div class="column">
              <g-link><span class="legend-item" style="background: #d5e9b9;"></span> Herbazales de pantano<br></g-link>
              <g-link><span class="legend-item" style="background: #cfe188;"></span> Herbazales arbustivos sobre arena<br></g-link>
              <g-link><span class="legend-item" style="background: #fbeabd;"></span> Herbazales tepuyanos<br></g-link>
              <g-link><span class="legend-item" style="background: #f7f175;"></span> Herbazales litorales<br></g-link>
              <g-link><span class="dot" style="background: black;"></span> Vegetación saxícola<br></g-link>
              <span class="legend-item lightstripe"></span> Áreas intervenidas<br>
              <span class="legend-item" style="background: #99daf2"></span> Cuerpos de agua<br>

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
    	content
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
import { latLng } from "leaflet";
  import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

  export default {
    components: {
      LMap,
      LTileLayer,
      LMarker,
    },
    data() {
      return {
        zoom: 6,
        center: latLng(6.4238, -66.5897),
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        currentZoom: 11.5,
        currentCenter: latLng(52.547715, 13.413936),
        mapOptions: {
          zoomSnap: 0.5
        }
      }
    }
  }
</script>
