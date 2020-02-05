<template>
  <div>
    <section class="hero">
      <g-image class="hero-bg-img" :src="banner" />
      <div class="hero-body">
        <g-link v-if="link" :to="link" class="hero-link is-size-4 is-size-5-mobile">{{lead}}</g-link>
        <span class="is-size-4 is-size-5-mobile" v-else v-html="lead"></span>
        <p class="hero-text is-size-2 is-uppercase has-text-weight-bold is-size-4-mobile" v-html="title"></p>
        <p v-if="subtitle" class="hero-text is-size-4 is-size-6-mobile">{{subtitle}}</p>
        <slot name="follow"></slot>
      </div>
    </section>
    <figcaption class="has-text-centered">
      <div class="is-size-6 is-size-7-mobile" v-html="caption"></div>
    </figcaption>
  </div>
</template>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .hero {
    position: relative;
    height: 300px;
    color: white;
  }

  .hero-body {
    position: absolute;
    bottom: 0;
    padding: 10px;
    padding-left: 40px;
    background: rgba(0, 0, 0, .2);
  }

  .hero-bg-img {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }

  .hero-text {
    line-height: 1.2;
    color: white;
  }

  .hero-link {
    color: white;
  }

  .hero-link:hover {
    color: $primary;
  }
</style>

<script>

  export default {
    name: 'PageBanner',
    props: {
      banner: { type: Object, required: true },
      caption: { type: String, required: true },
      lead: { type: String, required: true },
      link: { type: String, required: false },
      title: { type: String, required: true },
      subtitle: {type: String, required: false}
    }
  }
</script>
