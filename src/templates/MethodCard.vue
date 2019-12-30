<template>
  <Layout>
      <div>
        <section class="hero is-small is-white">
          <div class="hero-body">
            <div class="container is-fullhd has-text-centered">
              <p class="is-uppercase is-size-6">Métodos</p>
              <p class="title is-uppercase is-size-4-mobile">{{$page.methodCard.title}}</p>
            </div>
          </div>
        </section>
        <div class="has-text-centered">
          <g-image v-if="$page.methodCard.cardimage" :src="$page.methodCard.cardimage" fit="inside" />
        </div>
        <figcaption class="has-text-centered"><div class="is-size-6 is-size-7-mobile" v-html="$page.methodCard.cardimagecaption"></div></figcaption>
        <section class="section">
          <div class="tile is-vertical is-parent">
            <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
              :text="$page.methodCard.content"
              :photos="$page.methodCard.photos"
              :refs="$page.methodCard.method.references"
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
      </div>
  </Layout>
</template>

<page-query>
  query MethodCard ($path: String!) {
    methodCard: methodCard (path: $path) {
      title
      cardimage
      cardimagecaption
      method {
        references {
          referencekey
          reference
        }
      }
      photos {
        photokey
        photourl
        photocaption
      }
      content
    }
  }
</page-query>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  ::v-deep thead {
    background-color: #f8e7e8;
  }

  ::v-deep .table-in-content {
    border: solid 2px $primary;
    border-collapse: separate;
  }

  .table {
    word-break: break-word;
  }

</style>

<script>
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'

  export default {
    data() {
      return {
        showMore: false
      }
    },
    mounted () {
    },
    beforeRouteUpdate (to, from, next) {
      this.showMore = false
      next()
    },
    components: {
      TextWithRefsAndPhotos,
      SideBar
    },
    computed: {
      sortedReferences: function() {
        return this.$page.methodCard.method.references.sort((a, b) => a.reference.localeCompare(b.reference))
      }
    },
    methods: {
      isCurrentItem: function(item) {
        return item.cardPath != this.$route.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1) + this.$route.hash
      }
    }
  }

</script>
