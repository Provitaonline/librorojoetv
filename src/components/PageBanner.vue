<template>
  <div>
    <section class="hero" :style="cssVars">
      <g-image class="hero-bg-img" :src="banner" />
      <div class="hero-body">
        <g-link v-if="link" :to="link" class="hero-link is-size-4 is-size-5-mobile"><span v-html="lead"></span></g-link>
        <span class="is-size-4 is-size-5-mobile" v-else v-html="lead"></span>
        <p class="hero-text is-size-2 is-uppercase has-text-weight-bold is-size-4-mobile" v-html="title"></p>
        <p v-if="subtitle" class="hero-text is-size-4 is-size-6-mobile">{{subtitle}}</p>
        <p v-if="authors" class="hero-text is-size-5 is-size-6-mobile">{{authors}}</p>
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
    color: white;
  }

  .hero-body {
    position: absolute;
    bottom: var(--hero-bottom);
    padding: 10px;
    padding-left: 40px;
    background: rgba(0, 0, 0, .2);
  }

  .hero-bg-img {
    height: var(--banner-height);
    width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    .hero-bg-img {
      height: var(--default-banner-height);
    }
    .hero-body {
      bottom: 0;
    }
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
  const defaultBannerHeight = '300px'

  export default {
    name: 'PageBanner',
    props: {
      banner: { type: Object, required: true },
      caption: { type: String, required: false },
      lead: { type: String, required: false },
      link: { type: String, required: false },
      title: { type: String, required: true },
      subtitle: {type: String, required: false},
      authors: {type: String, required: false},
      bannerHeight: {type: String, required: false, default: defaultBannerHeight},
      heroBottom: {type: String, required: false, default: '0'}
    },
    data() {
      return {
        cssVars: {
          '--banner-height': this.bannerHeight,
          '--default-banner-height': defaultBannerHeight,
          '--hero-bottom': this.heroBottom
        }
      }
    }
  }
</script>
