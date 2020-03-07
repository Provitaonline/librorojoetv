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

  ::v-deep .no-row-shading table>tr {
    background: none;
  }

  ::v-deep .align-top table>tr>td {
    vertical-align: top !important;
  }

  ::v-deep .table-container {
    /*box-shadow: 0 3px 10px 4px rgba(0, 0, 0, 0.12) !important; */
    border: none !important;
  }

</style>

<script>
  import PageBanner from '~/components/PageBanner.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import References from '~/components/References.vue'

  export default {
    metaInfo: {
      title: 'Método'
    },
    data() {
      return {
      }
    },
    mounted () {
    },
    components: {
      PageBanner,
      TextWithRefsAndPhotos,
      References
    },
    computed: {
      pageTitle() {
        return this.$page.methodCard.title.replace(/<[^>]*>?/gm, ' ')
      },
      pageImage() {
        return this.$page.methodCard.cardimage.src
      }
    }
  }

</script>
