<template>
  <Layout>
    <div class="page-wrapper red-line">
      <section class="hero">
        <g-image class="hero-bg-img" :src="$page.homeData.bannerImage"/>
        <div class="hero-body">
          <g-image src="~/assets/svgs/librorojo-banner.svg"/>
        </div>
      </section>
      <BannerInfo :info="$page.homeData.bannerCaption" />
      <section style="padding-top: 88px; padding-bottom: 88px;" class="section not-as-narrow">
        <div class="tile is-ancestor">
          <div class="tile">
            <div v-for="item in $page.homeData.indexCards" class="tile is-parent" style="flex-direction: column;">

                <g-link :to="item.link">
                  <div class="card tile is-child menu-card">
                    <div class="card-image">
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
                    <div class="menu-card-button" >
                      <button class="button is-primary">Explorar</button>
                    </div>
                  </div>
                </g-link>

            </div>
          </div>
        </div>
      </section>

      <section class="hero">
        <g-image class="bottom-bg-img" src="~/assets/images/download-background.jpg"/>

        <div class="bottom-body has-text-centered">

          <div class="container">
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
      bannerImage
      bannerCaption
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
    position: absolute;
    width: 600px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
  }

  .hero-bg-img {
    height: 540px;
    width: 100%;
    object-fit: cover;
  }

  .bottom-bg-img {
    object-fit: cover;
    width: 100%;
    height: 200px;
    /* opacity: 0.8; */
  }

  .bottom-body {
    position: absolute;
    width: 400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10px;
  }

  @media screen and (max-width: 768px) {
    .hero-bg-img {
      height: 200px;
    }
    .hero-body {
      width: 300px;
    }
    .bottom-body {
      width: 320px;
    }
  }

  .button {
    border-radius: 7px;
  }

  .button:hover {
    color: #DBDBDB;
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

  .card-content {
    height: 280px;
  }

  .card-image {
    padding: 10%;
  }

  .menu-card:hover {
    box-shadow: 0 2px 44px 0 rgba(0, 0, 0, 0.14);
  }

  .menu-card {
    box-shadow: none;
  }

  .menu-card-button {
    display: flex;
    justify-content: center;
    padding: 10px;
  }

  .explore-title {
    color: $primary;
    font-family: $family-serif;
  }

  .download-text {
    color: white;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5%;
    padding-right: 5%;

    border-radius: 10px;
    border: solid 2px white;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .download-text:hover {
    color: #DBDBDB;
  }

</style>

<script>
  import BannerInfo from '~/components/BannerInfo.vue'

  export default {
    metaInfo: {
      title: 'Página principal'
    },
    components: {
      BannerInfo
    },
    created() {
    },
    mounted () {
    },
    updated() {

    },
    computed: {
      pageTitle() {
        return this.$page.homeData.heroTitle
      },
      pageImage() {
        return this.$page.homeData.bannerImage.src
      }
    },
    methods: {

    },
    watch: {
    }
  }
</script>
