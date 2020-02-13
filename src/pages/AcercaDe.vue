<template>
  <Layout>
    <div class="red-line">

      <PageBanner
        :banner="$page.homeData.about.cardimage"
        :caption="$page.homeData.about.cardimagecaption"
        title="Acerca del libro rojo<br>de los ecosistemas terrestres<br>de Venezuela"
        bannerHeight="600px"
        />
      </PageBanner>

      <section class="section is-center-narrow">
        <div class="tile is-vertical is-parent">
          <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
            :text="$page.homeData.content"
            :refs="$page.references.references"
            :photos="$page.homeData.about.photos"
            :isContent="true" />
          </TextWithRefsAndPhotos>
          <References class="box" :references="$page.references.references">
          </References>
        </div>
      </section>
    </div>
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
    references: references (id: "acerca-de") {
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
  import PageBanner from '~/components/PageBanner.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import References from '~/components/References.vue'

  export default {
    metaInfo: {
      title: 'Acerca de'
    },
    data() {
      return {
        showMore: false
      }
    },
    components: {
      PageBanner,
      TextWithRefsAndPhotos,
      References
    }
  }
</script>
