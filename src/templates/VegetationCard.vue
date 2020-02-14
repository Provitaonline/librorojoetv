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
              :photos="$page.vegetationCard.photos"
              :isContent="true" />
            </TextWithRefsAndPhotos>
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
  }
</page-query>

<style lang="scss" scoped>


</style>

<script>
  import PageBanner from '~/components/PageBanner.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'

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
      TextWithRefsAndPhotos
    }
  }

</script>
