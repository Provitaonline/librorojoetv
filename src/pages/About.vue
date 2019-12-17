<template>
  <Layout>
      <section class="hero is-small is-white">
        <div class="hero-body">
          <div class="is-uppercase has-text-centered">
            <h1 class="title">ACERCA DE</h1>
          </div>
        </div>
        <div class="section" v-html="$page.homeData.content">
        </div>
      </section>
  </Layout>
</template>

<page-query>
  query Home {
    homeData: homeData (path: "/content/home") {
      content
    }
  }
</page-query>

<style lang="scss" scoped>
  ::v-deep .centerme {
    display: block;
    margin: auto;
  }
</style>
