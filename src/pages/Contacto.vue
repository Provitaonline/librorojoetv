<template>
  <Layout>
    <div class="red-line">
      <section class="hero">
        <g-image class="hero-bg-img" :src="$page.homeData.contact.banner"/>
        <div class="hero-body">
          <g-image src="~/assets/images/provita.png"/>
        </div>
      </section>

      <section class="section is-center-narrow">
        <div class="tile is-ancestor">
          <div class="tile ">
            <div class="tile is-parent" style="flex-direction: column;">
              <font-awesome size="2x" :icon="['fas', 'map-marker-alt']"/>
              <h1>Provita</h1>
              <p v-html="$page.homeData.contact.address"></p>
            </div>
            <div class="tile is-parent" style="flex-direction: column;">
              <font-awesome size="2x" :icon="['fas', 'phone']"/>
              <h1>Teléfonos</h1>
              <p v-html="$page.homeData.contact.phone"></p><br>
           </div>
            <div class="tile is-parent" style="flex-direction: column;">
              <font-awesome size="2x" :icon="['fas', 'envelope']"/>
              <h1>Mail</h1>
              <p><a :href="'mailto:' + $page.homeData.contact.email">{{$page.homeData.contact.email}}</a></p><br>
            </div>
            <div class="tile is-parent" style="flex-direction: column;">
              <font-awesome size="2x" :icon="['fas', 'globe-americas']"/>
              <h1>Web</h1>
              <p><a :href="$page.homeData.contact.web">{{$page.homeData.contact.web}}</a></p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

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
    position: absolute;
    width: 225px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
  }

  .hero-bg-img {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }

  h1 {
    padding: 0;
    margin: 0;
  }
</style>

<page-query>
  query Home {
    homeData: homeData (id: "home") {
      contact {
        address
        phone
        email
        web
        banner
      }
    }
  }
</page-query>

<script>
  export default {
    metaInfo: {
      title: 'Contacto'
    }
  }
</script>
