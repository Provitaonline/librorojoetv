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
            :refs="$page.references.references"
            :photos="$page.homeData.about.photos"
            :isContent="true" />
          </TextWithRefsAndPhotos>
          <div class="container is-size-5 has-text-centered">
            <a @click="showMore = !showMore">
              <p v-if="!showMore">VER BIBLIOGRAFÍA...<font-awesome :icon="['fas', 'angle-down']"/></p>
              <p v-else>OCULTAR BIBLIOGRAFÍA...<font-awesome :icon="['fas', 'angle-up']"/></p>
              <br>
            </a>
          </div>
          <transition name="fade" appear>
            <div v-if="showMore" style="padding-top: 0px;" class="tile is-child box is-size-6 is-size-7-mobile">
              <h1 style="margin-top: 0px;">Bibliografía</h1>
              <table class="table">
                <tbody>
                  <tr v-for="value in sortedReferences">
                    <td>{{value.reference}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </transition>
        </div>
      </section>
  </Layout>
</template>

<page-query>
  query Home {
    homeData: homeData (id: "home") {
      about {
        cardimage
        cardimagecaption
        photos {
          photokey
          photourl
          photocaption
        }
      }
      content
    }
    references: references (id: "intro") {
      references {
        referencekey
        reference
      }
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
        showMore: false
      }
    },
    mounted () {
    },
    computed: {
      sortedReferences: function() {
        return this.$page.references.references.sort((a, b) => a.reference.localeCompare(b.reference))
      }
    },
    components: {
      TextWithRefsAndPhotos
    }
  }
</script>
