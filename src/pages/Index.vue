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
      <section>
        <div class="container">

        </div>
      </section>
      <section>
        <div class="container" style="height: 800px;">
          <l-map
            ref="myMap"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            style="height: 80%"
          >
            <l-tile-layer :url="url" />
          </l-map>
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
