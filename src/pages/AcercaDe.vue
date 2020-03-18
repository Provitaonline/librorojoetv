<template>
  <Layout>
    <div class="red-line">

      <PageBanner
        :banner="$page.homeData.about.cardimage"
        :caption="$page.homeData.about.cardimagecaption"
        :title="$page.homeData.about.title"
        :citationPre="$page.homeData.about.citationPre"
        :citationPost="$page.homeData.about.citationPost"
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
        title
        citationPre
        citationPost
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

  @import "~/assets/style/_variables";

  ::v-deep .colab {
    width: 100%;
  }

  ::v-deep .table-in-content {
    font-size: 1rem !important;
    width: 100%;
    table-layout: fixed;
  }

  ::v-deep thead {
    font-size: 1.5rem !important;
    background-color: $table-header-background-color;
  }

  ::v-deep td {
    border: none;
  }

  @media screen and (max-width: 768px) {
    ::v-deep .table-in-content {
      font-size: 0.6rem !important;
    }
    ::v-deep thead {
      font-size: 0.8rem !important;
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
    },
    computed: {
      pageTitle() {
        return 'Acerca del libro rojo de los ecosistemas terrestres de Venezuela'
      },
      pageImage() {
        return this.$page.homeData.about.cardimage.src
      }
    }
  }
</script>
