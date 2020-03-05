<template>
  <Layout>
      <div class="red-line">

        <PageBanner
          :banner="$page.vegetationCard.cardimage"
          :caption="$page.vegetationCard.cardimagecaption"
          lead="Vegetación"
          :title="$page.vegetationCard.title"
          />
        </PageBanner>

        <section class="section is-center-narrow">
          <div class="tile is-vertical is-parent">
            <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
              :text="$page.vegetationCard.content"
              :refs="$page.references.references"
              :photos="$page.vegetationCard.photos"
              :isContent="true" />
            </TextWithRefsAndPhotos>
            <References :references="$page.references.references">
            </References>
          </div>
        </section>
      </div>
  </Layout>
</template>

<page-query>
  query VegetationCard ($id: ID!) {
    vegetationCard: vegetationCard (id: $id) {
      title
      cardimage
      cardimagecaption
      photos {
        photokey
        photourl
        photocaption
      }
      content
    }

    references: references (id: "unidades") {
      references {
        referencekey
        reference
      }
    }
  }
</page-query>

<style lang="scss" scoped>


</style>

<script>
  import PageBanner from '~/components/PageBanner.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import References from '~/components/References.vue'

  export default {
    metaInfo: {
      title: 'Vegetación'
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
        return this.$page.vegetationCard.title.replace(/<[^>]*>?/gm, ' ')
      },
      pageImage() {
        return this.$page.vegetationCard.cardimage.src
      }
    }
  }

</script>
