<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <h1 class="title is-uppercase"><g-link :to="'/' + $page.references.id"><span v-html="$page.references.title"></span></g-link></h1>
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
      }
    }
  }
</script>
