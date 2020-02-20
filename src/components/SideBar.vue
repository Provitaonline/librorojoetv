<template>
  <div class="columns is-gapless">
    <aside class="side-panel column is-narrow" v-bind:class="{ isopen: sidePanelOpen }">
      <div class="side-panel-content" v-bind:class="{ isopen: sidePanelOpen }">
        <div class="side-panel-title">
          <!-- <a title="Cerrar panel" style="float: right; padding-right: 8px;" v-on:click="toggleSidePanelState()">
            <span class="close-side-panel-icon is-size-5">✕</span>
          </a> -->
          <a v-if="sidePanelOpen" v-on:click="toggleSidePanelState()" role="button">
            <div title="Cerrar panel lateral" class="side-panel-triangle-left">
              <div class="side-panel-times"><font-awesome :icon="['fas', 'times']"/></div>
            </div>
          </a>
          <p class="side-panel-title-text is-size-4 has-text-weight-bold">
            <slot name="title"></slot>
          </p>
        </div>
        <slot name="sidebar"></slot>
      </div>
    </aside>
    <div class="column">
      <div class="side-panel-open-button red-line">
        <a v-if="!sidePanelOpen" v-on:click="toggleSidePanelState()" role="button">
          <div title="Abrir panel lateral" class="side-panel-triangle-right">
            <div class="side-panel-bars"><font-awesome :icon="['fas', 'bars']"/></div>
          </div>
          <!-- <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 278.571 275.714" class="open-side-panel-icon">
            <g>
              <title>Clic para abrir panel de fichas</title>
              <path  stroke-width="10" stroke-linecap="round" stroke-linejoin="round" d="M10 10h258.57v255.714H10z"></path>
              <path d="M77.143 10.714L78.57 265" fill-rule="evenodd" stroke-width="10"></path>
              <path d="M582.857 733.79L210.906 945.68l2.474-428.064z" fill-opacity="0" transform="matrix(.33171 0 0 .39595 48.089 -151.84)" stroke-width="50" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
          </svg> -->
        </a>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import "~/assets/style/_variables";

  .side-panel {
    /*border-right: 1px solid #e0e0e0; */
  }

  @media only screen and (min-width: 769px) {
    .side-panel {
      width: 20rem;
      margin-left: -20rem !important;
      transition: margin-left .3s;
    }
  }

  @media only screen and (max-width: 768px) {
    .side-panel {
      min-width: 20rem;
      border-right: 0;
      /*border-bottom: 1px solid #e0e0e0; */
    }
  }

  .side-panel.isopen {
    margin-left: 0 !important;
  }

  .side-panel-content {
    height: 0;
    transition: height .3s;
    overflow: auto;
    position: sticky;
    top: 0;
  }

  .side-panel-open-button {
    z-index: 1; /* This button must stay on top of content */
    position: absolute;
    /* padding-top: 10px; */
  }

  @media only screen and (min-width: 769px) {
    .side-panel-open-button {
      position: sticky;
      top: 10px;
    }
  }

  .side-panel-title {
    /* background-color: #fafafa; */
    color: $primary;
  }

  .side-panel-title-text {
    padding-left: 20px;
    padding-top: 30px;
    padding-bottom: 0px;
  }

  @media only screen and (min-width: 769px) {
    .side-panel-content.isopen {
      height: 100vh;
    }
  }

  @media only screen and (max-width: 768px) {
    .side-panel-content.isopen {
      height: 100%;
    }
  }

  .open-side-panel-icon>g {
    stroke: #5f5f5f;
    fill: #ffffff;
    fill-opacity: 0.5;
  }

  .open-side-panel-icon>g:hover {
    stroke: $primary;
  }

  .close-side-panel-icon {
    color: #5f5f5f;
  }

  .close-side-panel-icon:hover {
    color: $primary;
  }

  .side-panel-triangle-right {
    position: absolute;
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-left: 25px solid $primary;
    border-bottom: 20px solid transparent;
  }

  .side-panel-triangle-left {
    width: 0;
    height: 0;
    border-top: 20px solid transparent;
    border-right: 25px solid $primary;
    border-bottom: 20px solid transparent;
    float: right;
  }

  .side-panel-bars {
    position: relative;
    left: -28px;
    top: -12px;
    color: white;
  }

  .side-panel-bars:hover {
    color: #d3d3d3;
  }

  .side-panel-times:hover {
    color: #d3d3d3;
  }

  .side-panel-times {
    position: relative;
    right: -12px;
    top: -12px;
    color: white;
  }
</style>

<script>
  export default {
    name: 'SideBar',
    data() {
      return {
        sidePanelOpen: false
      }
    },
    methods: {
      toggleSidePanelState: function() {
        this.sidePanelOpen = !this.sidePanelOpen
      }
    }
  }
</script>
