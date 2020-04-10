<template>
  <Layout>
    <div class="page-wrapper red-line">

      <PageBanner
        :banner="$page.references.banner"
        :lead="$page.references.title"
        :link="'/' + linkToParent"
        :title="$page.labels.references.title"
        />
      </PageBanner>

      <div class="section is-center-narrow">
        <References class="box" :references="$page.references.references" :hasHeading="false"></References>
      </div>

    </div>
  </Layout>
</template>

<page-query>
  query ($id: ID!) {
    references: references (id: $id) {
      id
      parent
      title
      banner
      references {
        referencekey
        reference
      }
    }
    labels (id: "labels") {
      references {
        title
      }
    }
  }
</page-query>

<style lang="scss" scoped>

</style>

<script>
  import PageBanner from '~/components/PageBanner.vue'
  import References from '~/components/References.vue'

  export default {
    metaInfo: {
      title: 'Bibliografía'
    },
    data() {
      return {
      }
    },
    components: {
      PageBanner,
      References
    },
    computed: {
      linkToParent: function() {
        return this.$page.references.parent ? this.$page.references.parent + '/' + this.$page.references.id : this.$page.references.id
      },
      pageTitle() {
        return 'Bibliografía: ' + this.$page.references.title.replace(/<[^>]*>?/gm, ' ')
      }
    }
  }
</script>
