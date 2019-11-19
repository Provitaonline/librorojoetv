<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <p class="title is-uppercase is-size-6">Unidades de paisaje</p>
            <p class="title is-uppercase is-size-4-mobile">{{$page.unitCard.title}}</p>
          </div>
        </div>
      </section>
      <div class="has-text-centered">
        <g-image v-if="$page.unitCard.cardimage" :src="$page.unitCard.cardimage" fit="inside" />
      </div>
      <figcaption class="has-text-centered"><div class="is-size-6 is-size-7-mobile" v-html="$page.unitCard.cardimagecaption"></div></figcaption>
      <section class="section">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-parent">
            <div class="tile is-parent">
              <!-- <div class="d-content tile is-child is-size-5" v-html="$page.vegetationCard.content"></div> -->
              <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
                :text="$page.unitCard.content"
                :refs="$page.unitCardReferences.references"
                :photos="$page.unitCard.photos"
                :isContent="true" />
              </TextWithRefsAndPhotos>
            </div>
          </div>
        </div>
      </section>
    </div>
  </Layout>
</template>

<page-query>
  query UnitCard ($path: String!) {
    unitCard: unitCard (path: $path) {
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
    unitCardReferences: unitCardReferences (path: "/content/units-references") {
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
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'

  export default {

    mounted () {
    },
    components: {
      TextWithRefsAndPhotos
    }
  }

</script>
