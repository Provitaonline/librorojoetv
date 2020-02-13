<template>
  <Layout>
      <div class="red-line">

        <PageBanner
          :banner="$page.methodCard.cardimage"
          :caption="$page.methodCard.cardimagecaption"
          lead="Métodos"
          :title="$page.methodCard.title"
          />
        </PageBanner>

        <section class="section is-center-narrow">
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
  query MethodCard ($id: ID!) {
    methodCard: methodCard (id: $id) {
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
  import PageBanner from '~/components/PageBanner.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'

  export default {
    metaInfo: {
      title: 'Método'
    },
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
      PageBanner,
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
