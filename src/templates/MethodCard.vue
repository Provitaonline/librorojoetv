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
            <References class="box" :references="$page.methodCard.method.references">
            </References>
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
  import References from '~/components/References.vue'

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
      References,
      SideBar
    },
    methods: {
      isCurrentItem: function(item) {
        return item.cardPath != this.$route.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1) + this.$route.hash
      }
    }
  }

</script>
