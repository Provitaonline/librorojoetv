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
          <div class="tile is-ancestor">
            <div class="tile is-vertical is-parent">
              <div class="tile is-parent">
                <!-- <div class="d-content tile is-child is-size-5" v-html="$page.vegetationCard.content"></div> -->
                <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
                  :text="$page.methodCard.content"
                  :photos="$page.methodCard.photos"
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
  query MethodCard ($path: String!) {
    methodCard: methodCard (path: $path) {
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
    references: references (id: "units") {
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
  import SideBar from '~/components/SideBar.vue'

  export default {

    mounted () {
    },
    components: {
      TextWithRefsAndPhotos,
      SideBar
    },
    methods: {
      isCurrentItem: function(item) {
        return item.cardPath != this.$route.path.replace(/\/$/, '').match(/\/[^\/]+$/)[0].substring(1) + this.$route.hash
      }
    }
  }

</script>
