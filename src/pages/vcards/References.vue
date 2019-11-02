<template>
  <Layout>
    <div class="page-wrapper">
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="container is-fullhd has-text-centered">
            <h1 class="title is-uppercase ">Riesgo de colapso de los<br>ecosistemas terrestres de Venezuela</h1>
            <h2 class="title">Bibliografía</h2>
          </div>
        </div>
      </section>
      <div class="section is-size-6 is-size-7-mobile">
        <b-table :data="$page.vegetationCardReferences.references" :columns="columns" :mobile-cards="false"></b-table>
      </div>
    </div>
  </Layout>
</template>

<page-query>
  query References {
    vegetationCardReferences: vegetationCardReferences (path: "/content/vcards-references") {
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
            label: 'Referencia'
          }
        ]
      }
    }
  }
</script>
