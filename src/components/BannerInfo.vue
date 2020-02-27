<template>
  <b-dropdown v-if="info" class="info-icon" :mobile-modal="false" position="is-top-left">
    <div style="width: 50vw;" slot="trigger"><font-awesome size="lg" :icon="['fas', 'info-circle']" /></div>
    <b-dropdown-item custom :focusable="false">
      <p class="has-text-left" v-html="infoLabel"></p>
    </b-dropdown-item>
  </b-dropdown>
</template>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  ::v-deep .dropdown-menu {
    bottom: 0 !important;
    right: 30px !important;
  }

</style>

<script>

  export default {
    name: 'BannerInfo',
    props: {
      info: {type: String, required: false}
    },
    computed: {
      infoLabel: function () {
        return '<b>Foto: </b>' + this.info
      }
    }
  }

</script>
