<template>
  <div>
    <section class="hero" :style="cssVars">
      <g-image v-if="banner" class="hero-bg-img" :src="banner" />
      <g-image v-else class="hero-bg-img" src="~/assets/images/default-banner.jpg" />
      <div class="hero-body-outer">
        <div class="hero-body-container">
          <div class="hero-body">
            <g-link v-if="link" :to="link" class="hero-link is-size-3 is-size-4-desktop is-size-6-touch"><span v-html="lead"></span></g-link>
            <span class="is-size-3 is-size-6-touch" v-else v-html="lead"></span>
            <div>
              <span class="hero-text is-size-1 is-uppercase has-text-weight-bold is-size-2-desktop is-size-4-tablet is-size-5-mobile" v-html="title"></span>
              <b-dropdown id="citationDropdown" @active-change="citationChange" position="is-top-right" class="citation-icon" :mobile-modal="false">
                <span title="Cita" slot="trigger">&nbsp;<font-awesome size="xs" :icon="['fas', 'book']"/></span>
                <b-dropdown-item custom :focusable="false">
                  <p><span v-html="'<b>Cita: </b>' + citationText"></span>
                    &nbsp;
                    <a title="Copiar texto" class="copy-citation-to-clipboard" :data-clipboard-text="citationText">
                      <font-awesome :icon="['far', 'copy']"/>
                    </a>
                  </p>
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <p v-if="subtitle" class="hero-text is-size-4 is-size-6-touch">{{subtitle}}</p>
            <p v-if="authors" class="hero-text is-size-5 is-size-7-touch">{{authors}}</p>
            <slot name="follow"></slot>
          </div>
        </div>
      </div>
    </section>
    <BannerInfo :info="caption" />
  </div>
</template>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .hero {
    color: white;
  }

  .hero-body-outer {
    width: 100%;
  }

  .hero-body-container {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    justify-content: center;
    margin: 0 auto;
    max-width: $narrow-text-width;
    margin-top: var(--minus-banner-height);
    height: var(--banner-height);
  }

  .hero-body {
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    padding: 60px;
    align-content: center;
    background: rgba(0, 0, 0, .2);
  }

  .hero-bg-img {
    height: var(--banner-height);
    width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: $narrow-text-width) {
    .hero-body {
      width: 100%;
    }
  }

  @media screen and (max-width: 768px) {
    .hero-body-container {
      margin-top: var(--minus-mobile-banner-height);
      height: var(--mobile-banner-height);
    }
    .hero-bg-img {
      height: var(--mobile-banner-height);
    }
    .hero-body {
      padding-top: 5px;
      padding-bottom: 5px;
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
    text-decoration: underline;
  }

  ::v-deep #citationDropdown .dropdown-content {
    width: 40vw;
  }

  @media screen and (max-width: 768px) {
    ::v-deep #citationDropdown .dropdown-content {
      width: 70vw;
    }
  }

</style>

<script>
  import BannerInfo from '~/components/BannerInfo.vue'
  import {docCitation} from '~/assets/js/siteConfig.js'

  import ClipboardJS from 'clipboard'
  let clipboard

  const defaultBannerHeight = '540px'
  const mobileBannerHeight = '300px'

  let defaultBanner = require('~/assets/images/default-banner.jpg')

  export default {
    name: 'PageBanner',
    props: {
      banner: { type: Object, required: false },
      caption: { type: String, required: false },
      lead: { type: String, required: false },
      link: { type: String, required: false },
      title: { type: String, required: true },
      citationPre: { type: String, required: false },
      citationPost: { type: String, required: false },
      subtitle: {type: String, required: false},
      authors: {type: String, required: false},
      bannerHeight: {type: String, required: false, default: defaultBannerHeight},
      heroPaddingBottom: {type: String, required: false, default: '44px'}
    },
    data() {
      return {
        cssVars: {
          '--banner-height': this.bannerHeight,
          '--minus-banner-height': '-' + this.bannerHeight,
          '--default-banner-height': defaultBannerHeight,
          '--mobile-banner-height': mobileBannerHeight,
          '--minus-mobile-banner-height': '-' + mobileBannerHeight,
          '--hero-padding-bottom': this.heroPaddingBottom
        },
        docCitation: docCitation
      }
    },
    components: {
      BannerInfo
    },
    mounted() {
      clipboard = new ClipboardJS('.copy-citation-to-clipboard')
    },
    beforeDestroy() {
      clipboard.destroy()
    },
    computed: {
      citationText: function() {
        return (this.citationPre ? this.citationPre + ' ' : '') + this.docCitation + (this.citationPost ? ' ' + this.citationPost : '')
      }
    },
    methods: {
      citationChange: function(active) {
        let citationDropdownElement = document.getElementById('citationDropdown')
        let offset =  (window.innerWidth / 2) - citationDropdownElement.offsetLeft - 120
        citationDropdownElement.querySelector('.dropdown-menu').setAttribute('style', 'left: ' + Math.min(0,offset) + 'px')
        if (active) {

        }
      }
    }
  }
</script>
