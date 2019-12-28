<template>
  <Layout>
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <p class="title is-uppercase is-size-4-mobile">Acerca de</p>
          </div>
        </div>
      </section>
      <div class="has-text-centered">
        <g-image v-if="$page.homeData.about.cardimage" :src="$page.homeData.about.cardimage" fit="inside" />
      </div>
      <figcaption class="has-text-centered"><div class="is-size-6 is-size-7-mobile" v-html="$page.homeData.about.cardimagecaption"></div></figcaption>
      <section class="section">
        <div class="tile is-vertical is-parent">
          <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
            :text="$page.homeData.content"
            :isContent="true" />
          </TextWithRefsAndPhotos>
        </div>
      </section>
  </Layout>
</template>

<page-query>
  query Home {
    homeData: homeData (path: "/content/home") {
      about {
        cardimage
        cardimagecaption
      }
      content
    }
  }
</page-query>

<style lang="scss" scoped>

  ::v-deep .colab {
    width: 400px;
    max-width: 80%;
  }

  ::v-deep .table-in-content {
    font-size: 1rem !important;
  }

  @media screen and (max-width: 768px) {
    ::v-deep .table-in-content {
      font-size: 0.7rem !important;
    }
  }
</style>

<script>
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'

  export default {
    data() {
      return {
      }
    },
    mounted () {
    },
    components: {
      TextWithRefsAndPhotos
    }
  }
</script>
