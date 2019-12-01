<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <h1 class="title is-uppercase"><g-link :to="'/' + linkToParent"><span v-html="$page.references.title"></span></g-link></h1>
            <h2 class="title">Bibliografía</h2>
          </div>
        </div>
      </section>
      <div class="section is-size-6 is-size-7-mobile">
        <b-table :data="sortedReferences" :columns="columns" :mobile-cards="false"></b-table>
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
      references {
        referencekey
        reference
      }
    }
  }
</page-query>

<style lang="scss" scoped>
  ::v-deep .table {
    word-break: break-word;
  }
</style>

<script>
  export default {
    data() {
      return {
        columns: [
          {
            field: 'referencekey',
            label: 'Abreviación',
            width: '150'
          },
          {
            field: 'reference',
            label: 'Referencia',
            renderHtml: true
          }
        ]
      }
    },
    computed: {
      sortedReferences: function() {
        return this.$page.references.references.sort((a, b) => a.referencekey.localeCompare(b.referencekey))
      },
      linkToParent: function() {
        return this.$page.references.parent ? this.$page.references.parent + '/' + this.$page.references.id : this.$page.references.id
      }
    }
  }
</script>
