<template>
  <Layout>
    <SideBar>
      <template v-slot:title>
        Unidades de paisaje
      </template>
      <template v-slot:sidebar>
        <div class="box">
          <div v-for="item, index in $page.unitCardsIndex.legendItems">
            <div>
              <div class="side-panel-item-box side-panel-item">
                <span>{{'&nbsp;&nbsp;'.repeat(item.name.length-1)}}</span>
                <!-- <g-link v-if="getTargetSlug(item) != currentSlug" :to="pathParent + '/' + getTargetSlug(item)">{{item.name}}</g-link> -->
                <g-link :to="'/unidades/' + item.cardPath" :class="(isCurrentItem(item)) ? '' : 'current-item'">{{item.label}}</g-link>
                <br>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:content>
        <div class="red-line">

          <PageBanner
            :banner="$page.unitCard.cardimage"
            :caption="$page.unitCard.cardimagecaption"
            lead="Unidades de paisaje"
            link="/unidades"
            :title="$page.unitCard.title"
            />
          </PageBanner>

          <section class="section">
            <div class="tile is-ancestor">
              <div class="tile is-vertical is-parent">
                <div class="tile is-parent">
                  <!-- <div class="d-content tile is-child is-size-5" v-html="$page.vegetationCard.content"></div> -->
                  <TextWithRefsAndPhotos class="tile is-child box is-size-5 is-size-6-mobile"
                    :text="$page.unitCard.content"
                    :refs="$page.references.references"
                    :photos="$page.unitCard.photos"
                    :isContent="true" />
                  </TextWithRefsAndPhotos>
                </div>
              </div>
            </div>
          </section>
        </div>
      </template>


    </SideBar>
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
    references: references (id: "unidades") {
      references {
        referencekey
        reference
      }
    }
    unitCardsIndex: unitCardsIndex (path: "/content/explore/units-index") {
      title
      mapTitle
      legendItems {
        name
        isHeading
        isIndented
        label
        group
        color
        legend
        cardPath
      }
    }
  }
</page-query>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .current-item {
    font-style: italic;
    font-weight: bold;
  }

</style>

<script>
  import PageBanner from '~/components/PageBanner.vue'
  import TextWithRefsAndPhotos from '~/components/TextWithRefsAndPhotos.vue'
  import SideBar from '~/components/SideBar.vue'

  export default {
    metaInfo: {
      title: 'Región'
    },
    mounted () {
    },
    components: {
      PageBanner,
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
