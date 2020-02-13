<template>
  <Layout>
    <div class="page-wrapper red-line">

      <PageBanner
        :banner="$page.references.banner"
        :lead="$page.references.title"
        :link="'/' + linkToParent"
        title="Bibliografía"
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
  }
</page-query>

<style lang="scss" scoped>
  .table {
    word-break: break-word;
  }
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
      sortedReferences: function() {
        return this.$page.references.references.sort((a, b) => a.reference.localeCompare(b.reference))
      },
      linkToParent: function() {
        return this.$page.references.parent ? this.$page.references.parent + '/' + this.$page.references.id : this.$page.references.id
      }
    }
  }
</script>
