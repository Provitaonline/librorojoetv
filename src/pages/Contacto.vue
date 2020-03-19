<template>
  <Layout>
    <div class="red-line">
      <section class="hero">
        <g-image class="hero-bg-img" :src="$page.homeData.contact.banner"/>
        <div class="hero-body">
          <g-link title="Provita" :to="$page.homeData.contact.web">
            <g-image src="~/assets/images/provita.png"/>
          </g-link>
        </div>
      </section>
      <BannerInfo :info="$page.homeData.contact.bannerCaption"/>
      <section class="section is-center-narrow">
        <div class="tile is-ancestor">
          <div class="tile ">
            <div class="tile is-parent" style="flex-direction: column;">
              <g-image src="~/assets/svgs/location.svg"/>
              <h1 class="is-size-3">Provita</h1>
              <p v-html="$page.homeData.contact.address"></p>
            </div>
            <div class="tile is-parent" style="flex-direction: column;">
              <g-image src="~/assets/svgs/phone.svg"/>
              <h1 class="is-size-3">Teléfono</h1>
              <p v-html="$page.homeData.contact.phone"></p><br>
           </div>
            <div class="tile is-parent" style="flex-direction: column;">
              <g-image src="~/assets/svgs/mail.svg"/>
              <h1 class="is-size-3">Mail</h1>
              <p><a :href="'mailto:' + $page.homeData.contact.email">{{$page.homeData.contact.email}}</a></p><br>
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
    height: 540px;
    width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    .hero-bg-img {
      height: 300px;
    }
  }

  h1 {
    padding: 10px 0 0;
    margin: 0;
  }
</style>

<page-query>
  query Home {
    homeData: homeData (id: "home") {
      heroTitle
      contact {
        address
        phone
        email
        web
        banner
        bannerCaption
      }
    }
  }
</page-query>

<script>
  import BannerInfo from '~/components/BannerInfo.vue'

  export default {
    metaInfo: {
      title: 'Contacto'
    },
    components: {
      BannerInfo
    },
    computed: {
      pageTitle() {
        return 'Contacto: ' + this.$page.homeData.heroTitle
      },
      pageImage() {
        return require('!!assets-loader!~/assets/images/provita.png').src
      }
    }
  }
</script>
